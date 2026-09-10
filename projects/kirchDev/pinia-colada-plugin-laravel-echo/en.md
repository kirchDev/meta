# Live cache for Pinia Colada with Laravel Echo

Connects Pinia Colada queries to Laravel Echo. Events keep the cache current, and a dropped WebSocket connection reliably refreshes it once when it returns.

## why

Binding a query to an Echo channel otherwise repeats the same work: subscribe on mount, change the cache in the handler, leave on unmount and handle a disconnected connection. The last part is easy to miss, although the cache then holds data that looks current but missed events.

The plugin makes connection state a cache rule. While Echo is connected, events keep the query current. After a disconnect its normal refetch behaviour applies again, and after reconnecting it is invalidated once.

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

The subscription lives as long as the cache entry does. If the connection drops and returns, the query fetches the changes it missed.

## features

- **Subscription follows the cache** — a channel is joined when the entry is created and left when it is removed.
- **Connection-aware validity** — after a disconnect normal staleTime applies again; after reconnecting the entry is invalidated exactly once.
- **Reference-counted channels** — several queries on one channel keep it open until the last one is removed.
- **No payload opinion** — handlers receive Echo's payload and cache access; the application decides how data is inserted or replaced.
- **Every Echo transport** — Reverb, Pusher, Ably and Socket.io work through Laravel Echo's abstraction.

## scope

The plugin neither synchronizes data models nor defines events. It manages only the connection between an opt-in query and its Echo channel; authentication, the backend and the meaning of an event remain the application's concern.

## install

```pnpm
pnpm add @kirchdev/pinia-colada-plugin-laravel-echo
```

@pinia/colada, laravel-echo and vue are peer dependencies. The Echo instance is passed to the plugin when Pinia Colada is set up.
