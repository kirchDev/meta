# Live-Cache für Pinia Colada mit Laravel Echo

Verbindet Pinia-Colada-Queries mit Laravel Echo. Ereignisse halten den Cache aktuell, und nach einer unterbrochenen WebSocket-Verbindung wird er einmal zuverlässig erneuert.

## why

Eine Query an einen Echo-Kanal zu binden, bedeutet sonst wiederholt: beim Mount abonnieren, im Handler den Cache ändern, beim Unmount verlassen und eine getrennte Verbindung behandeln. Der letzte Teil fehlt leicht, obwohl der Cache danach Daten enthält, die aktuell aussehen, aber Ereignisse verpasst haben.

Das Plugin macht den Verbindungszustand zur Cache-Regel. Solange Echo verbunden ist, halten Ereignisse die Query aktuell. Nach einer Trennung greift ihr normales Refetch-Verhalten wieder, nach der Rückkehr wird sie einmal invalidiert.

## quickstart

```ts
useQuery({
  key: ['notifications', 'list'],
  query: () => $fetch('/me/notifications'),
  echo: {
    channel: () => `App.Models.User.${userId.value}`,
    listen: {
      '.NotificationBroadcasted': (payload, { setQueryData }) =>
        setQueryData((old) => [payload, ...(old ?? [])])
    }
  }
});
```

Das Abo lebt so lange wie der Cache-Eintrag. Fällt die Verbindung aus und kommt zurück, lädt die Query die verpassten Änderungen nach.

## features

- **Abonnement folgt dem Cache** — ein Kanal wird beim Anlegen des Eintrags betreten und beim Entfernen wieder verlassen.
- **Verbindungsbewusste Gültigkeit** — nach einer Trennung gilt wieder die normale staleTime; nach der Rückkehr wird genau einmal invalidiert.
- **Referenzgezählte Kanäle** — mehrere Queries auf einem Kanal halten ihn offen, bis auch die letzte entfernt ist.
- **Keine Vorgabe für Nutzdaten** — Handler erhalten das Echo-Payload und einen Cache-Zugriff; wie Daten eingefügt oder ersetzt werden, entscheidet die Anwendung.
- **Jeder Echo-Transport** — Reverb, Pusher, Ably und Socket.io funktionieren über die Abstraktion von Laravel Echo.

## scope

Das Plugin synchronisiert keine Datenmodelle und legt keine Events fest. Es verwaltet nur die Verbindung zwischen einer opt-in Query und dem Echo-Kanal; Authentifizierung, Backend und die Bedeutung eines Ereignisses bleiben Sache der Anwendung.

## install

```pnpm
pnpm add @kirchdev/pinia-colada-plugin-laravel-echo
```

@pinia/colada, laravel-echo und vue sind Peer-Abhängigkeiten. Die Echo-Instanz wird beim Einrichten von Pinia Colada an das Plugin übergeben.
