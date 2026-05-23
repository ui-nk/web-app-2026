# API 仕様

## POST /api/message
説明：会議を作成する
リクエスト：{ "title1": "会議", "title2": "人間ぶっ殺しゾーン" }
レスポンス：{ "title1": "会議", "title2": "人間ぶっ殺しゾーン" }

## GET /api/message
説明：会議内容の一覧を返す
レスポンス：[{ "title": "会議" }]