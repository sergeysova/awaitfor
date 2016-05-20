# Await/For

Command line program to await for service is up.

```bash
npm i -g awaitfor

await http://dev.mysuperservice.com
```

Start checking every 1 second

```
Check address: http://dev.mysuperservice.com
#1  Nothing...
#2  Nothing...
#3  Nothing...
#4  Nothing...
#5  Nothing...
#6  Nothing...
#7  Nothing...
--- Address http://dev.mysuperservice.com is available!!! Notify
```

And show notification with [node-notifier](http://npmjs.com/node-notifier)
