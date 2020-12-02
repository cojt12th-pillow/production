# Pillow

## デプロイ方法

初期設定

```shell
# 関連パッケージのインストール
$ yarn

# Microbitの設定 (1回目のみ)
$ yarn run pxt target microbit && yarn run pxt install
# or
$ make init
```

Microbitへのデプロイ

```shell
# プログラムのビルド
$ yarn run build
# 接続しているMicrobitへデプロイ
$ yarn run deploy

# or
$ make start
```

ログはシリアル通信でPCへ送信します.

```shell
$ ls /dev/tty.usbmodem*
# 該当のpathからシリアル通信をwatch
$ sudo cu -s 115200 -l $usbmodem-path
```

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/shikibu9419/production** and import

## Edit this project ![Build status badge](https://github.com/shikibu9419/ble_playground/workflows/MakeCode/badge.svg)

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/shikibu9419/production** and click import

## Blocks preview

This image shows the blocks code from the last commit in master.
This image may take a few minutes to refresh.

![A rendered view of the blocks](https://github.com/shikibu9419/ble_playground/raw/master/.github/makecode/blocks.png)

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
