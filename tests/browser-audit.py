from __future__ import annotations

import json
import mimetypes
import subprocess
import time
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from playwright.sync_api import sync_playwright, Route

ROOT = Path(__file__).resolve().parents[1]
SCREEN_DIR = Path('/mnt/data')
PLACE_TO_UNIVERSE = {
    '110811521450324': '9100000001',
    '95624995252294': '9333955742',
    '101848404389998': '9397456825',
}
DISCORD = {
    'UXsEATcmaa': {'id': '111111111111111111', 'name': 'Summit Developers', 'icon': 'a_summit'},
    'sAQtQyyS': {'id': '222222222222222222', 'name': 'Cynex Services', 'icon': 'cynex'},
}
SVG = b'''<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="#080808"/><path d="M0 420L420 0h92v92L92 512H0z" fill="#260b10"/><rect x="58" y="58" width="396" height="396" fill="none" stroke="#ff2638" stroke-width="18"/><text x="256" y="290" text-anchor="middle" font-family="Arial" font-weight="900" font-size="96" fill="#f4f1eb">CYNEX</text></svg>'''


def fulfill_json(route: Route, payload: dict, status: int = 200) -> None:
    route.fulfill(status=status, content_type='application/json', body=json.dumps(payload))


def route_request(route: Route) -> None:
    request = route.request
    parsed = urlparse(request.url)
    host, path, query = parsed.hostname, parsed.path, parse_qs(parsed.query)

    if host in ('127.0.0.1', 'localhost'):
        route.continue_()
        return

    if host == 'cynex.test':
        if path.startswith('/mock/'):
            route.fulfill(status=200, content_type='image/svg+xml', body=SVG)
            return
        relative = 'index.html' if path in ('', '/') else path.lstrip('/')
        file_path = (ROOT / relative).resolve()
        if ROOT not in file_path.parents and file_path != ROOT:
            route.fulfill(status=403, body='forbidden')
            return
        if not file_path.exists() or not file_path.is_file():
            route.fulfill(status=404, body='not found')
            return
        mime = mimetypes.guess_type(file_path.name)[0] or 'application/octet-stream'
        route.fulfill(status=200, content_type=mime, body=file_path.read_bytes())
        return

    if host == 'apis.roblox.com' and '/universes/v1/places/' in path:
        place_id = path.rstrip('/').split('/')[-2]
        universe_id = PLACE_TO_UNIVERSE.get(place_id)
        if universe_id:
            fulfill_json(route, {'universeId': int(universe_id)})
        else:
            fulfill_json(route, {'errors': [{'message': 'Not found'}]}, 404)
        return

    if host == 'thumbnails.roblox.com' and path.endswith('/places/gameicons'):
        ids = query.get('placeIds', [''])[0].split(',')
        fulfill_json(route, {'data': [
            {'targetId': int(pid), 'state': 'Completed', 'imageUrl': f'https://cynex.test/mock/place-{pid}.svg'}
            for pid in ids if pid
        ]})
        return

    if host == 'thumbnails.roblox.com' and path.endswith('/games/icons'):
        ids = query.get('universeIds', [''])[0].split(',')
        fulfill_json(route, {'data': [
            {'targetId': int(uid), 'state': 'Completed', 'imageUrl': f'https://cynex.test/mock/game-{uid}.svg'}
            for uid in ids if uid
        ]})
        return

    if host == 'games.roblox.com' and path == '/v1/games':
        ids = query.get('universeIds', [''])[0].split(',')
        names = {
            '9100000001': ('Grow Your Pet', 'Skydda Concord Studio', 'Raise pets, unlock progression, and expand your collection through an evolving gameplay loop.'),
            '9333955742': ('[CARRY] Soft Pink Tower', 'Lazy Tower Studio', 'Climb a soft pink obstacle tower built around timing, movement, and repeat runs.'),
            '9397456825': ('Soft Pink Wallhop Tower', 'Lazy Tower Studio', 'Take on wallhop challenges and precision platforming as you climb the tower.'),
        }
        fulfill_json(route, {'data': [
            {'id': int(uid), 'name': names.get(uid, ('Roblox Experience', 'Roblox Creator', 'Roblox experience.'))[0],
             'description': names.get(uid, ('Roblox Experience', 'Roblox Creator', 'Roblox experience.'))[2],
             'creator': {'name': names.get(uid, ('Roblox Experience', 'Roblox Creator', 'Roblox experience.'))[1]}}
            for uid in ids if uid
        ]})
        return

    if host == 'thumbnails.roblox.com' and path.endswith('/groups/icons'):
        ids = query.get('groupIds', [''])[0].split(',')
        fulfill_json(route, {'data': [
            {'targetId': int(gid), 'state': 'Completed', 'imageUrl': f'https://cynex.test/mock/group-{gid}.svg'}
            for gid in ids if gid
        ]})
        return

    if host == 'discord.com' and '/api/v10/invites/' in path:
        code = path.rstrip('/').split('/')[-1]
        guild = DISCORD.get(code)
        if guild:
            fulfill_json(route, {'guild': guild, 'approximate_member_count': 128, 'approximate_presence_count': 17})
        else:
            fulfill_json(route, {'message': 'Unknown Invite'}, 404)
        return

    if host == 'cdn.discordapp.com' and path.startswith('/icons/'):
        route.fulfill(status=200, content_type='image/svg+xml', body=SVG)
        return

    route.abort('blockedbyclient')


def audit_page(browser, viewport: dict, screenshot_name: str, mobile: bool = False) -> dict:
    print(f'Auditing {viewport} mobile={mobile}', flush=True)
    context = browser.new_context(viewport=viewport, reduced_motion='reduce' if mobile else 'no-preference')
    page = context.new_page()
    page.route('**/*', route_request)
    errors: list[str] = []
    console_errors: list[str] = []
    page.on('pageerror', lambda exc: errors.append(str(exc)))
    page.on('console', lambda message: console_errors.append(message.text) if message.type == 'error' else None)
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    css = (ROOT / 'assets/css/styles.css').read_text(encoding='utf-8')
    runtime = (ROOT / 'assets/js/runtime-config.js').read_text(encoding='utf-8')
    bundle = (ROOT / 'assets/js/site.bundle.js').read_text(encoding='utf-8')
    html = html.replace('<link rel="stylesheet" href="assets/css/styles.css">', f'<base href="https://cynex.test/"><style>{css}</style>')
    html = html.replace('  <script src="assets/js/runtime-config.js"></script>\n', '')
    html = html.replace('  <script src="assets/js/site.bundle.js" defer></script>\n', '')
    html = html.replace('</body>', f'<script>{runtime}\n{bundle}</script></body>')
    page.set_content(html, wait_until='domcontentloaded', timeout=20_000)
    page.wait_for_selector('[data-project-grid] .project-card')
    print('rendered data', flush=True)

    for selector in ['.reveal', '.project-card', '.game-card', '.network-card', '.review-card', '.process-card', '.contract-page']:
        for locator in page.locator(selector).all():
            locator.scroll_into_view_if_needed()
    page.wait_for_function("[...document.querySelectorAll('.media-shell,.network-icon-shell')].every(el => el.dataset.state !== 'loading')", timeout=15_000)
    print('media loaded', flush=True)

    print('asserting structure', flush=True)
    assert page.title() == 'Cynex | Roblox Scripter Portfolio'
    assert page.locator('text=Extra Services').count() == 0
    assert page.locator('[data-project-grid] .project-card').count() == 6
    assert page.locator('[data-game-grid] .game-card').count() == 3
    assert page.locator('.game-credits').count() == 3
    assert page.locator('.game-credits dd', has_text='Programmer').count() == 3
    assert page.locator('a[href="downloads/Cynex-Services-Agreement-Fillable.pdf"]').count() >= 3
    assert page.locator('a[href="mailto:nathanielmadridgaminde@proton.me"]').count() == 1
    assert page.locator('[data-roblox-groups] .network-card').count() == 4
    assert page.locator('[data-discord-servers] .network-card').count() == 2
    assert page.locator('.media-shell[data-state="loaded"]').count() == 3
    assert page.locator('.network-icon-shell[data-state="loaded"]').count() == 6
    assert page.locator('img').evaluate_all("imgs => imgs.every(img => img.complete && img.naturalWidth > 0)")
    assert page.evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth")
    assert page.evaluate("""() => {
      const photo = document.querySelector('.hero-portrait').getBoundingClientRect();
      const console = document.querySelector('.hero-console').getBoundingClientRect();
      return console.top >= photo.bottom - 1;
    }""")
    assert page.evaluate("""() => {
      const stage = document.querySelector('.review-stage').getBoundingClientRect();
      const quote = document.querySelector('.review-card blockquote').getBoundingClientRect();
      return quote.left >= stage.left && quote.right <= stage.right && quote.bottom <= stage.bottom;
    }""")

    print('asserting links', flush=True)
    external = page.locator('a[target="_blank"][href^="http"]')
    for index in range(external.count()):
        link = external.nth(index)
        assert link.get_attribute('href', timeout=1000).startswith('https://')
        rel = link.get_attribute('rel') or ''
        assert 'noopener' in rel and 'noreferrer' in rel

    print('testing dialog', flush=True)
    page.locator('.project-play').first.click(timeout=5000)
    assert page.locator('[data-media-dialog]').evaluate('dialog => dialog.open')
    page.wait_for_function("document.querySelector('[data-dialog-video]').readyState >= 1", timeout=10_000)
    assert page.locator('[data-dialog-video]').evaluate('video => video.muted === false && video.volume > 0')
    page.locator('[data-dialog-close]').click()
    assert not page.locator('[data-media-dialog]').evaluate('dialog => dialog.open')

    print('dialog done', flush=True)
    if mobile:
        print('testing mobile menu', flush=True)
        page.evaluate('scrollTo(0, 0)')
        print('mobile scrolled', flush=True)
        page.evaluate("document.querySelector('[data-menu-toggle]').click()")
        print('mobile toggle clicked', flush=True)
        assert page.locator('[data-menu-toggle]').get_attribute('aria-expanded', timeout=2000) == 'true'
        print('mobile expanded', flush=True)
        assert page.locator('[data-mobile-nav]').is_visible(timeout=2000)
        print('mobile visible', flush=True)
        page.evaluate("const a=document.querySelector('[data-mobile-nav] a'); a.addEventListener('click', e => e.preventDefault(), {once:true}); a.click()")
        print('mobile link clicked', flush=True)
        assert page.locator('[data-menu-toggle]').get_attribute('aria-expanded', timeout=2000) == 'false'
        print('mobile menu done', flush=True)

    page.evaluate('scrollTo(0, 0)')
    print('taking screenshot', flush=True)
    page.screenshot(path=str(SCREEN_DIR / screenshot_name), full_page=not mobile)
    print('screenshot done', flush=True)
    result = {
        'viewport': viewport,
        'page_errors': errors,
        'console_errors': console_errors,
        'scroll_width': page.evaluate('document.documentElement.scrollWidth'),
        'client_width': page.evaluate('document.documentElement.clientWidth'),
    }
    context.close()
    return result


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(
        headless=True,
        executable_path='/usr/bin/chromium',
        args=['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking'],
    )
    results = [
        audit_page(browser, {'width': 1440, 'height': 1000}, 'cynex-desktop.png'),
        audit_page(browser, {'width': 390, 'height': 844}, 'cynex-mobile.png', mobile=True),
    ]
    browser.close()

for result in results:
    assert not result['page_errors'], result['page_errors']
    assert not result['console_errors'], result['console_errors']
print(json.dumps(results, indent=2))
