# recycler-view-demo

Recycler-view-demo is a NativeScript-built Android app for demonstrating the usage of recycler-view plugin.

<h2 id="screenshots">Screenshots</h2>

![](assets/screenshot.png)

<h2 id="development">Development</h2>

This app is built with the [NativeScript CLI](https://github.com/NativeScript/nativescript-cli). Once you have the [CLI installed](https://github.com/NativeScript/nativescript-cli#installation), start by cloning the repo:

```
$ git clone https://github.com/zh-m/recycler-view-demo
$ cd recycler-view-demo
```

Next, install the app's Android runtimes, as well as the app's npm dependencies:

```
$ tns install
```

From there you can use the `run` command to run Groceries on Android:

```
$ tns run android --emulator
```

Finally, use the `livesync` command to push out changes to your app without having to go through the full build cycle:

```
$ tns livesync android --emulator --watch
```

