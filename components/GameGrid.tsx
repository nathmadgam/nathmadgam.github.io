"use client";

import { useEffect, useState } from "react";
import type { Game } from "@/lib/data";
import { resolveRobloxGameThumbnail } from "@/lib/media-client";

type GameState = Game & { image: string };

export function GameGrid({ games }: { games: Game[] }) {
  const [items, setItems] = useState<GameState[]>(games.map((game) => ({ ...game, image: game.cachedImage })));

  useEffect(() => {
    let active = true;
    Promise.all(games.map(async (game) => ({
      placeId: game.placeId,
      imageUrl: await resolveRobloxGameThumbnail(game.placeId, game.universeId),
    }))).then((results) => {
      if (!active) return;
      setItems((current) => current.map((game) => {
        const match = results.find((result) => result.placeId === game.placeId);
        return match?.imageUrl ? { ...game, image: match.imageUrl } : game;
      }));
    });
    return () => { active = false; };
  }, [games]);

  return (
    <div className="game-grid">
      {items.map((game, index) => (
        <a key={game.placeId} href={game.url} target="_blank" rel="noreferrer" className="game-card" style={{ animationDelay: `${index * 120}ms` }}>
          <div className="game-image-wrap">
            <img src={game.image} alt={`${game.name} Roblox experience thumbnail`} onError={(event) => { event.currentTarget.src = game.fallback; }} />
            <span className="game-index">0{index + 1}</span>
          </div>
          <div className="game-copy">
            <small>ROBLOX EXPERIENCE</small>
            <h3>{game.name}</h3>
            <dl>
              <div><dt>Created by</dt><dd>{game.creator}</dd></div>
              <div><dt>My role</dt><dd>{game.role}</dd></div>
            </dl>
            <p>{game.description}</p>
            <span className="external-link">View experience ↗</span>
          </div>
        </a>
      ))}
    </div>
  );
}
