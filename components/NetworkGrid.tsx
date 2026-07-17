"use client";

import { useEffect, useState } from "react";
import type { NetworkItem } from "@/lib/data";
import { resolveDiscordIcon, resolveRobloxGroupIcon } from "@/lib/media-client";

function NetworkCard({ item }: { item: NetworkItem }) {
  const [image, setImage] = useState(item.cachedImage);

  useEffect(() => {
    let active = true;
    const request = item.groupId
      ? resolveRobloxGroupIcon(item.groupId)
      : resolveDiscordIcon(item.inviteCode ?? "");

    request.then((imageUrl) => {
      if (active && imageUrl) setImage(imageUrl);
    });
    return () => { active = false; };
  }, [item.groupId, item.inviteCode]);

  return (
    <a className="network-card" href={item.url} target="_blank" rel="noreferrer">
      <img src={image} alt={`${item.name} icon`} onError={(event) => { event.currentTarget.src = item.fallback; }} />
      <span><small>{item.role}</small><strong>{item.name}</strong><p>{item.description}</p></span>
      <i aria-hidden="true">↗</i>
    </a>
  );
}

export function NetworkGrid({ title, items }: { title: string; items: NetworkItem[] }) {
  return <div><h3 className="network-title">{title}</h3><div className="network-grid">{items.map((item) => <NetworkCard item={item} key={item.name} />)}</div></div>;
}
