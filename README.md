# nodejs
・PCとスマホのｃｓｓ振り分けはできた。

・PCでの周り込み横幅の指定がうまくいっていない。
サンプルではpタグの文字列が長くなると、左のエリアの横幅が長くなってしまう。
-> 解消 09:58
外側の div には
table-layout: fixed;とwidth: 100%;を指定する。
内側の div には
word-wrap: break-word;とoverflow: hidden;を指定します。
これで、長いテキストや、大きな画像が折り返されたりする。
