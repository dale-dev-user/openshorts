import React from 'react';
import { Sparkles, Zap, Globe, FileVideo, Subtitles, Youtube, Instagram, Shield, Github, ArrowRight, Play, Check, ChevronDown, Monitor, Cpu, Languages, Type, Upload, Scissors } from 'lucide-react';

const TikTokIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group bg-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
      <Icon size={24} className="text-primary" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
      {number}
    </div>
    <div>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const ComparisonRow = ({ feature, openshorts, opusclip, kapwing }) => (
  <tr className="border-b border-white/5">
    <td className="py-3 px-4 text-sm text-zinc-300">{feature}</td>
    <td className="py-3 px-4 text-center">{openshorts}</td>
    <td className="py-3 px-4 text-center">{opusclip}</td>
    <td className="py-3 px-4 text-center">{kapwing}</td>
  </tr>
);

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-white/10 rounded-xl overflow-hidden">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
    >
      <span className="text-white font-medium pr-4">{question}</span>
      <ChevronDown size={18} className={`text-zinc-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <div className="px-6 pb-5">
        <p className="faq-answer text-zinc-400 text-sm leading-relaxed">{answer}</p>
      </div>
    )}
  </div>
);

export default function Landing({ onLaunchApp }) {
  const [openFaq, setOpenFaq] = React.useState(null);

  const features = [
    {
      icon: Sparkles,
      title: "AI による「バズる瞬間」検出",
      description: "Google Gemini 3.0 Flash が動画の文字起こしとシーン境界を解析し、最も惹きつける 3〜15 個の瞬間を抽出。各クリップは感情的インパクト、フックの強さ、シェアされやすさで評価され、TikTok の For You アルゴリズムに近い基準でランク付けされます。"
    },
    {
      icon: Scissors,
      title: "9:16 縦動画へのスマートクロップ",
      description: "デュアルモード AI リフレーミング。TRACK モードは MediaPipe の顔検出 + YOLOv8 フォールバックで被写体を追従。GENERAL モードは集合シーンや風景向けにブラー背景レイアウトを生成します。"
    },
    {
      icon: Subtitles,
      title: "字幕の自動生成",
      description: "faster-whisper による単語単位タイムスタンプ付き文字起こし。Verizon Media の調査では字幕がある動画は最後まで視聴される確率が 80% 高くなります。スタイル付き字幕を自動生成し動画に焼き付けます。"
    },
    {
      icon: Languages,
      title: "30+ 言語の AI 音声吹き替え",
      description: "ElevenLabs AI と連携し、元話者の声質を保ったまま音声を翻訳・吹き替え。CSA Research によれば消費者の 76% は母国語のコンテンツを好むため、吹き替えはグローバル展開の鍵です。"
    },
    {
      icon: Type,
      title: "フック（テキストオーバーレイ）",
      description: "目を引くスタイル付きテキストを重ねられます。AI が最初の 3 秒で視聴者を掴むフックタイトルを生成。TikTok / Reels では決定的に重要な要素です。"
    },
    {
      icon: Zap,
      title: "AI 動画エフェクト",
      description: "Google Gemini が動的な FFmpeg フィルタを生成。カラーグレーディングやトランジションなどプロ品質のエフェクトが自動適用されます。"
    },
    {
      icon: Upload,
      title: "YouTube URL またはローカルアップロード",
      description: "YouTube の URL を貼り付けるか、ローカルファイルをアップロード。yt-dlp が最大画質でダウンロードし、解像度と音声を保ちます。"
    },
    {
      icon: Shield,
      title: "100% セルフホスト・プライベート",
      description: "Docker で自分のマシンにデプロイ。動画は外部に出ません。API キーはクライアント側で暗号化、サーバには保存されません。"
    },
    {
      icon: Monitor,
      title: "無料 AI YouTube Studio",
      description: "AI サムネイル生成、AI タイトル候補（10 案 + 改善チャット）、章タイムスタンプ付き説明文の自動生成すべて無料。顔写真をアップすればパーソナライズしたサムネも作れて、そのまま YouTube に公開できます。"
    },
    {
      icon: Globe,
      title: "SNS への直接投稿",
      description: "ダッシュボードから TikTok / Instagram Reels / YouTube Shorts へ直接投稿。非同期アップロードと進捗トラッキング、S3 バックアップ付き。"
    },
    {
      icon: Sparkles,
      title: "AI UGC 動画ジェネレータ",
      description: "あらゆる商品・ビジネス向けに AI アクター付きマーケ動画を生成。URL を貼るか商品を説明するだけで、AI がスクリプトを書き、リップシンク付きアバター、Bロール、字幕、フックを付けて完成。1 本 $0.65 から。"
    },
    {
      icon: FileVideo,
      title: "AI アクター & リップシンク",
      description: "AI 生成アクターのギャラリーから選ぶか、自分の写真をアップロード。自然な動きとリップシンクで英語/スペイン語のトーキングヘッド動画を生成。Low Cost ($0.65) と Premium ($2.00) の 2 モード。"
    }
  ];

  const steps = [
    { title: "YouTube の URL を貼るか動画をアップロード", description: "YouTube リンクをドロップするか、ローカル動画をアップロード。OpenShorts は主要なフォーマット・解像度に対応しています。" },
    { title: "AI が最高のバズり瞬間を検出", description: "Google Gemini 3.0 Flash が文字起こしとシーン境界を解析し、15〜60 秒のポテンシャルが高いクリップを 3〜15 本抽出します。" },
    { title: "9:16 縦動画へのスマートクロップ", description: "AI が顔追従で各クリップを縦動画化。被写体は中央に保たれ、カメラの揺れも抑えられるため手動調整は不要です。" },
    { title: "字幕・フック・エフェクトを追加", description: "スタイル付き字幕の自動生成、フックの追加、AI エフェクトの適用。任意で 30+ 言語へ吹き替え可能。" },
    { title: "ダウンロード or SNS へ投稿", description: "クリップを書き出すか、ダッシュボードから TikTok / Instagram Reels / YouTube Shorts へ直接投稿。" }
  ];

  const faqs = [
    {
      question: "OpenShorts とは何ですか？どう動きますか？",
      answer: "OpenShorts は無料・オープンソースの AI クリップジェネレータで、長尺の YouTube 動画やローカル動画を 9:16 縦動画のバズり用ショートに変換します。多段 AI パイプラインを使用：単語単位タイムスタンプの faster-whisper 文字起こし、PySceneDetect によるシーン境界検出、Google Gemini 3.0 Flash による最も惹きつける瞬間の特定。HubSpot の 2025 年 State of Marketing レポートではショート動画は最も ROI が高いコンテンツ形式で、長尺コンテンツのリパーパスでリーチが最大 300% 向上するとされています。"
    },
    {
      question: "本当に無料ですか？落とし穴はありますか？",
      answer: "OpenShorts は 100% 無料・オープンソースです。Docker を使って自分のマシンやサーバでセルフホスト。3 つの外部 API を利用しますがすべて無料枠あり。Google Gemini API（必須）が AI 解析・バズり瞬間検出・サムネイル生成を担い、無料枠は 1 日 1,500 リクエスト。ElevenLabs API（任意）は 30+ 言語の AI 吹き替え用で無料枠あり。Upload-Post API（任意）は YouTube / TikTok / Instagram への直接投稿用ソーシャル API で月 10 本まで無料、クレカ不要。透かしも使用制限もサブスクも従量課金もありません（Opus Clip は月 $15-228、Kapwing は月 $24-79）。"
    },
    {
      question: "OpenShorts と Opus Clip の違いは？",
      answer: "OpenShorts は Opus Clip の無料・セルフホスト版です。AI バズり瞬間検出とスマート縦クロップは両方とも備えています。主な違い：OpenShorts は完全無料、Opus Clip は月 $15-228。OpenShorts は自分のインフラ（完全プライベート）、Opus Clip はクラウドのみ。OpenShorts は Google Gemini 3.0 Flash、Opus Clip は独自モデル。OpenShorts は 30+ 言語の AI 吹き替え、AI エフェクト、フックを追加で備えます。代わりに OpenShorts は Docker のセルフホストが必要で、Opus Clip はそのまま使えるクラウドサービスです。"
    },
    {
      question: "YouTube 動画を TikTok や Reels に変換するには？",
      answer: "YouTube URL を OpenShorts に貼り、無料の Gemini API キーを入力して Process を押すだけ。AI が yt-dlp で動画をダウンロードし、faster-whisper で文字起こし、Google Gemini 3.0 Flash で最良の瞬間を検出、MediaPipe の顔追従で 9:16 縦動画にクロップします。Wyzowl の 2025 年動画マーケ統計では 91% の企業が動画をマーケ手段として活用し、リパーパスされたショートはオリジナルの 2.5 倍のエンゲージメントを得ています。"
    },
    {
      question: "OpenShorts はバズり瞬間検出に何の AI を使っていますか？",
      answer: "Google の最新マルチモーダル AI、Google Gemini 3.0 Flash を使ってバズり瞬間検出とタイトル生成を行います。AI はタイムスタンプ付きの全文文字起こしと PySceneDetect のシーン境界データを受け取り、エンゲージメントパターンを解析して 3〜15 個の最もシェアされやすい瞬間を特定。各クリップは感情的インパクト、フックの強さ、バズるポテンシャルでスコアリングされます（TikTok / YouTube のランク付けと類似）。"
    },
    {
      question: "他言語への翻訳・吹き替えは可能ですか？",
      answer: "可能です。ElevenLabs AI 吹き替えと統合しており、元話者の声質を保ったまま 30+ 言語に翻訳。吹き替え後はシステムが新しい音声を再度文字起こしし、ターゲット言語の字幕も生成します。グローバル向けのリパーパスが容易になり、調査では吹き替えコンテンツは非英語圏で 2〜3 倍のエンゲージメントを得ます。"
    },
    {
      question: "スマート縦クロップはどう動きますか？",
      answer: "16:9 横動画を 9:16 縦動画に変換するための 2 つのインテリジェントモードを用意。TRACK モードは MediaPipe 顔検出（YOLOv8 フォールバック）で単一被写体を追従し、「Heavy Tripod」スタビライゼーションでプロのカメラマンのように滑らかに追跡。GENERAL モードは集合シーンや風景向けにブラー背景レイアウトを生成。SpeakerTracker が被写体間の急激な切り替えを抑制し、一時的な遮蔽にも対応します。"
    },
    {
      question: "YouTube サムネとタイトルの無料生成はできますか？",
      answer: "はい。OpenShorts は無料の AI YouTube サムネイル生成、AI YouTube タイトル生成、AI YouTube 説明文生成を内蔵（すべて Google Gemini 3.0 Flash）。動画をアップすると AI がインタラクティブな改善チャット付きで 10 個のバズりタイトル案を提示。さらに AI 画像生成で複数のサムネデザインを作成（顔写真や背景画像をアップしてパーソナライズ）。章タイムスタンプ付き説明文の自動生成、YouTube への直接公開もサポート。Gemini 無料枠ですべて 100% 無料。"
    },
    {
      question: "システム要件は？",
      answer: "Docker が動く環境ならどこでも。推奨は 8GB+ RAM のモダンなマルチコア CPU。GPU アクセラレーション（NVIDIA CUDA）は任意ですが動画処理が大幅に高速化。Docker Compose 構成で依存関係を自動管理（Python 3.11、FFmpeg、YOLOv8、MediaPipe、faster-whisper、React ダッシュボード）。Linux / macOS / Windows（WSL2 + Docker Desktop）で動作します。"
    },
    {
      question: "無料・オープンソースのクリップジェネレータはありますか？",
      answer: "はい、OpenShorts は 100% 無料・オープンソースのクリップジェネレータです。Opus Clip（月 $15-228）や Kapwing（月 $24-79）と違い、透かし・使用制限・サブスクなしで無制限にクリップを生成可能。さらに無料の AI YouTube サムネ／タイトル／説明文生成も内蔵（他ツールでは追加課金される機能）。Docker で自分のマシンにセルフホストし、完全なプライバシーとコントロールを確保できます。"
    },
    {
      question: "AI UGC 動画ジェネレータとは？",
      answer: "OpenShorts は AI UGC（ユーザー生成風コンテンツ）動画クリエイタを内蔵し、あらゆる商品・ビジネス向けに AI アクター付きマーケ動画を生成。商品を説明するか URL を貼るだけで、AI がバズるスクリプトを書き、リップシンク付きの AI アクターを生成、Bロール、TikTok 風字幕、フックを追加。TikTok / Instagram Reels / YouTube Shorts にそのまま投稿できる縦動画が完成。Low Cost（Hailuo + VEED Lipsync で約 $0.65/本）と Premium（Kling Avatar v2 で約 $2/本）の 2 モード。"
    },
    {
      question: "AI UGC 動画 1 本のコストは？",
      answer: "OpenShorts 自体は無料ですが、AI Shorts 機能は外部 API（動画生成は fal.ai、ナレーションは ElevenLabs）が従量課金です。Low Cost モードは 1 本あたり約 $0.65（Flux 画像 $0.05 + ElevenLabs 音声 $0.10 + Hailuo img2video $0.19 + VEED Lipsync $0.20 + Bロール $0.10）。Premium モードは Kling Avatar v2 で 1 本約 $2.00。UGC クリエイター発注（1 本 $50-500）や HeyGen（月 $24-180）と比べてはるかに安価です。"
    },
    {
      question: "AI UGC 動画はどんなビジネスでも使えますか？",
      answer: "はい。AI Shorts ジェネレータは SaaS だけでなく、レストラン、EC、コーチング、ローカルビジネス、個人ブランド、アプリなどあらゆる商品・サービスで使えます。テキスト欄に事業内容を入力するか（例：「マドリードの薪窯職人ピザ、宅配あり」）、ウェブサイトの URL を貼れば、AI がそのビジネス向けにカスタマイズしたバズりマーケスクリプトを生成します。"
    }
  ];

  const checkIcon = <Check size={16} className="text-green-400 mx-auto" />;
  const xIcon = <span className="text-zinc-500 text-sm">有料</span>;

  return (
    <div className="min-h-screen bg-background text-white">
      {/* ナビゲーション */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-openshorts.png" alt="OpenShorts logo" className="w-8 h-8" />
            <span className="text-lg font-bold">OpenShorts</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">機能</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">使い方</a>
            <a href="#comparison" className="hover:text-white transition-colors">比較</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/mutonby/openshorts"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <button
              onClick={onLaunchApp}
              className="bg-primary hover:bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
            >
              アプリを起動
            </button>
          </div>
        </div>
      </nav>

      {/* ヒーローセクション */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary mb-8">
            <Sparkles size={14} />
            <span>無料・オープンソースの AI クリップジェネレータ + UGC 動画クリエイタ</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
            無料・オープンソースの
            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-500 bg-clip-text text-transparent"> クリップジェネレータ </span>
            ＆ AI UGC 動画クリエイタ
          </h1>

          <p className="hero-description text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            3 つのツールが 1 つに。<strong className="text-white">クリップジェネレータ：</strong>長尺 YouTube を AI 検出・スマート 9:16 クロップ・自動字幕でバズりショートに。<strong className="text-white">AI Shorts：</strong>あらゆるビジネス向けに AI アクター + リップシンクの UGC マーケ動画を生成。<strong className="text-white">YouTube Studio：</strong>無料 AI サムネ、改善チャット付き 10 個のバズりタイトル案、章付き自動説明文。セルフホスト、オープンソース、制限なし。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={onLaunchApp}
              className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-medium transition-all active:scale-[0.98] shadow-lg shadow-primary/20 text-lg"
            >
              無料で始める
              <ArrowRight size={20} />
            </button>
            <a
              href="https://github.com/mutonby/openshorts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-3.5 rounded-xl font-medium transition-all hover:bg-white/10 text-lg"
            >
              <Github size={20} />
              GitHub で見る
            </a>
          </div>

          {/* プラットフォームアイコン */}
          <div className="flex items-center justify-center gap-6 text-zinc-500">
            <span className="text-sm">対応エクスポート先：</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <TikTokIcon size={18} />
                <span className="text-sm">TikTok</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Instagram size={18} />
                <span className="text-sm">Reels</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Youtube size={18} />
                <span className="text-sm">Shorts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 数値バー */}
      <section className="border-y border-white/5 bg-surface/30">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-sm text-zinc-400 mt-1">無料・オープンソース</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">3</div>
            <div className="text-sm text-zinc-400 mt-1">ツール in 1</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">30+</div>
            <div className="text-sm text-zinc-400 mt-1">吹き替え対応言語</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">$0</div>
            <div className="text-sm text-zinc-400 mt-1">透かしなし</div>
          </div>
        </div>
      </section>

      {/* 3 ツール in 1 セクション */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">3 つの無料ツールを 1 つのプラットフォームで</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">ショート動画の制作・最適化・配信に必要なものすべてが揃います。すべて無料・オープンソース。</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface/50 border border-primary/20 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <Scissors size={28} className="text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">クリップジェネレータ</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">長尺 YouTube やローカル動画をバズり用 9:16 ショートに変換。AI が最良の瞬間を検出、顔追従で縦クロップ、字幕も自動付与。</p>
              <ul className="space-y-1.5">
                {['AI バズり瞬間検出', '顔追従スマートクロップ', '自動字幕＋フック', '30+ 言語の AI 吹き替え'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-zinc-400"><Check size={12} className="text-green-400 shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
            <div className="bg-surface/50 border border-violet-500/20 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <Sparkles size={28} className="text-violet-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">AI Shorts</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">あらゆる商品・ビジネス向けに AI アクター付き UGC マーケ動画を生成。カメラもスタジオも不要。商品を説明するだけでバズり用動画が完成。</p>
              <ul className="space-y-1.5">
                {['AI アクター生成 + リップシンク', 'URL や説明文からスクリプト生成', 'Bロール + TikTok 風字幕', '1 本 $0.65 から'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-zinc-400"><Check size={12} className="text-green-400 shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
            <div className="bg-surface/50 border border-pink-500/20 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <Monitor size={28} className="text-pink-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">YouTube Studio</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">完全無料の AI YouTube ツールキット。自分の顔写真でサムネ生成、改善チャット付き 10 個のバズりタイトル案、タイムスタンプ付き説明文を自動生成。</p>
              <ul className="space-y-1.5">
                {['AI サムネ生成（顔アップ対応）', 'バズりタイトル 10 案 + チャット', '章付き説明文の自動生成', 'YouTube への直接公開'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-zinc-400"><Check size={12} className="text-green-400 shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 機能セクション */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">無料 AI クリップジェネレータ + UGC 動画クリエイタ</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">3 つのツールが 1 つに：長尺動画をバズりショートに、AI アクターで UGC マーケ動画を生成、サムネ・タイトル・説明文すべて揃う YouTube Studio。</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* API キーセクション */}
      <section className="py-20 px-6 bg-surface/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">すべての API に無料枠あり</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">OpenShorts は 3 つの外部 API を使用し、すべて寛容な無料枠付き。必須なのは Gemini のみ。API キーはクライアント側で暗号化されサーバには保存されません。</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-surface/50 border border-white/10 rounded-2xl p-6 relative">
              <div className="absolute top-4 right-4 bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/30">必須</div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <Cpu size={24} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Google Gemini API</h3>
              <span className="inline-block text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full mb-3">無料枠：1,500 req/日</span>
              <p className="text-zinc-400 text-sm leading-relaxed">すべての AI 機能を駆動：バズり瞬間検出、タイトル生成、動画エフェクト、YouTube サムネ生成、説明文作成。OpenShorts のコアエンジン。</p>
            </div>
            <div className="bg-surface/50 border border-white/10 rounded-2xl p-6 relative">
              <div className="absolute top-4 right-4 bg-zinc-700/50 text-zinc-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-zinc-600/30">任意</div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                <Languages size={24} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">ElevenLabs API</h3>
              <span className="inline-block text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full mb-3">無料枠あり</span>
              <p className="text-zinc-400 text-sm leading-relaxed">30+ 言語の AI 音声吹き替え・翻訳を有効化。元話者の声質を保ったまま音声を翻訳。吹き替え後のクリップは字幕も自動生成。</p>
            </div>
            <div className="bg-surface/50 border border-white/10 rounded-2xl p-6 relative">
              <div className="absolute top-4 right-4 bg-zinc-700/50 text-zinc-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-zinc-600/30">任意</div>
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                <Globe size={24} className="text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Upload-Post API</h3>
              <span className="inline-block text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full mb-3">無料枠あり</span>
              <p className="text-zinc-400 text-sm leading-relaxed">YouTube / TikTok / Instagram Reels への直接公開を有効化。<a href="https://www.upload-post.com" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 underline">ソーシャルメディア API</a> で OpenShorts から離れずに投稿可能。</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mt-5">
            <div className="bg-surface/50 border border-white/10 rounded-2xl p-6 relative">
              <div className="absolute top-4 right-4 bg-violet-700/50 text-violet-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-violet-500/30">AI SHORTS</div>
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                <Zap size={24} className="text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">fal.ai API</h3>
              <span className="inline-block text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full mb-3">$0.04 から従量課金</span>
              <p className="text-zinc-400 text-sm leading-relaxed">AI Shorts を駆動：AI アクター画像（Flux）、トーキングヘッド動画（Hailuo / Kling）、リップシンク（VEED）を生成。AI UGC 動画ジェネレータでのみ必要。</p>
            </div>
            <div className="bg-surface/50 border border-white/10 rounded-2xl p-6 relative">
              <div className="absolute top-4 right-4 bg-violet-700/50 text-violet-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-violet-500/30">AI SHORTS</div>
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                <Languages size={24} className="text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">ElevenLabs TTS</h3>
              <span className="inline-block text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full mb-3">無料枠あり</span>
              <p className="text-zinc-400 text-sm leading-relaxed">AI Shorts のスクリプトから自然なナレーションを生成。男声・女声、英語・スペイン語の複数のボイス選択肢。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 使い方セクション */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">使い方</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">YouTube URL からバズり用クリップまで、5 ステップ全自動。すべて自分のマシン上で AI がしっかり処理します。</p>
          </div>
          <div className="space-y-8">
            {steps.map((step, i) => (
              <StepCard key={i} number={i + 1} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* 技術スタック */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">実績ある技術で構築</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">業界トップの AI モデルとオープンソースを組み合わせた、本番投入可能な動画処理パイプライン。</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Google Gemini 3.0", desc: "AI 解析" },
              { name: "faster-whisper", desc: "文字起こし" },
              { name: "YOLOv8", desc: "物体検出" },
              { name: "MediaPipe", desc: "顔追跡" },
              { name: "FFmpeg", desc: "動画処理" },
              { name: "ElevenLabs", desc: "音声 & TTS" },
              { name: "fal.ai", desc: "AI 動画生成" },
              { name: "React + Vite", desc: "ダッシュボード" },
              { name: "Docker", desc: "デプロイ" }
            ].map((tech, i) => (
              <div key={i} className="bg-surface/50 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-white font-medium text-sm">{tech.name}</div>
                <div className="text-zinc-500 text-xs mt-1">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 比較表 */}
      <section id="comparison" className="py-20 px-6 bg-surface/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">無料クリップジェネレータ vs 有料サービス</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">同じ機能をセルフホストで無料で使えるなら、月 $15-228 を払う必要はありません。OpenShorts は無料の YouTube サムネ・タイトル・説明文生成も内蔵（有料ツールでは追加課金される機能）。</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-left text-sm text-zinc-400 font-medium">機能</th>
                  <th className="py-3 px-4 text-center text-sm font-medium">
                    <span className="text-primary">OpenShorts</span>
                  </th>
                  <th className="py-3 px-4 text-center text-sm text-zinc-400 font-medium">Opus Clip</th>
                  <th className="py-3 px-4 text-center text-sm text-zinc-400 font-medium">Kapwing</th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow feature="価格" openshorts={<span className="text-green-400 font-semibold">$0 無料</span>} opusclip={xIcon} kapwing={xIcon} />
                <ComparisonRow feature="AI バズり瞬間検出" openshorts={checkIcon} opusclip={checkIcon} kapwing={checkIcon} />
                <ComparisonRow feature="スマート縦クロップ" openshorts={checkIcon} opusclip={checkIcon} kapwing={checkIcon} />
                <ComparisonRow feature="自動字幕" openshorts={checkIcon} opusclip={checkIcon} kapwing={checkIcon} />
                <ComparisonRow feature="AI 音声吹き替え（30+ 言語）" openshorts={checkIcon} opusclip={<span className="text-zinc-500 text-sm">限定的</span>} kapwing={<span className="text-zinc-500 text-sm">なし</span>} />
                <ComparisonRow feature="AI 動画エフェクト" openshorts={checkIcon} opusclip={<span className="text-zinc-500 text-sm">なし</span>} kapwing={checkIcon} />
                <ComparisonRow feature="フック（テキストオーバーレイ）" openshorts={checkIcon} opusclip={checkIcon} kapwing={checkIcon} />
                <ComparisonRow feature="セルフホスト・プライベート" openshorts={checkIcon} opusclip={<span className="text-zinc-500 text-sm">クラウドのみ</span>} kapwing={<span className="text-zinc-500 text-sm">クラウドのみ</span>} />
                <ComparisonRow feature="透かしなし" openshorts={checkIcon} opusclip={<span className="text-zinc-500 text-sm">無料枠のみ</span>} kapwing={<span className="text-zinc-500 text-sm">有料</span>} />
                <ComparisonRow feature="オープンソース" openshorts={checkIcon} opusclip={<span className="text-zinc-500 text-sm">なし</span>} kapwing={<span className="text-zinc-500 text-sm">なし</span>} />
                <ComparisonRow feature="AI YouTube サムネ生成" openshorts={checkIcon} opusclip={<span className="text-zinc-500 text-sm">なし</span>} kapwing={<span className="text-zinc-500 text-sm">有料</span>} />
                <ComparisonRow feature="AI タイトル & 説明文生成" openshorts={checkIcon} opusclip={<span className="text-zinc-500 text-sm">限定的</span>} kapwing={<span className="text-zinc-500 text-sm">有料</span>} />
                <ComparisonRow feature="AI UGC 動画ジェネレータ" openshorts={checkIcon} opusclip={<span className="text-zinc-500 text-sm">なし</span>} kapwing={<span className="text-zinc-500 text-sm">なし</span>} />
                <ComparisonRow feature="AI アクター + リップシンク" openshorts={checkIcon} opusclip={<span className="text-zinc-500 text-sm">なし</span>} kapwing={<span className="text-zinc-500 text-sm">なし</span>} />
                <ComparisonRow feature="使用制限" openshorts={<span className="text-green-400 text-sm">無制限</span>} opusclip={<span className="text-zinc-500 text-sm">プランごと</span>} kapwing={<span className="text-zinc-500 text-sm">プランごと</span>} />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ユースケース */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">どんな人が使っている？</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">クリエイター、マーケター、エージェンシーがショート動画制作のスケールに OpenShorts を活用。HubSpot 2025 レポートでは、ショート動画は ROI が最も高いコンテンツ形式です。</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "YouTuber & クリエイター",
                description: "長尺 YouTube を TikTok や Reels 用クリップに自動でリパーパス。YouTube Creator Insider のデータでは、長尺と並行して Shorts を投稿するチャンネルは登録者が 20-30% 多く伸びています。",
                icon: Youtube
              },
              {
                title: "SNS マネージャ",
                description: "複数クライアント向けにショート動画制作をスケール。Sprout Social の 2025 Index では、消費者の 66% がショート動画を最もエンゲージするコンテンツと回答。バッチ処理して 1 つのダッシュボードから直接公開できます。",
                icon: Instagram
              },
              {
                title: "ポッドキャスト & 教育者",
                description: "ポッドキャストや教育コンテンツから最も惹きつける瞬間を抽出。Headliner の調査ではポッドキャストの SNS クリップによりエピソードのダウンロードが平均 72% 増加します。",
                icon: FileVideo
              },
              {
                title: "ビジネス & ブランド",
                description: "AI アクターであらゆる商品・ビジネス向けに UGC 風マーケ動画を生成。カメラもスタジオもインフルエンサー予算も不要。商品を説明するだけで、リップシンク AI アバター・ナレーション・Bロール・字幕付きのバズり動画が 1 本 $0.65 から完成。",
                icon: Sparkles
              }
            ].map((useCase, i) => (
              <div key={i} className="bg-surface/50 border border-white/10 rounded-2xl p-6">
                <useCase.icon size={24} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ セクション */}
      <section id="faq" className="py-20 px-6 bg-surface/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">よくある質問</h2>
            <p className="text-zinc-400">セットアップから機能まで、OpenShorts に関する疑問にお答えします。</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">無料でバズり動画作成を始めよう</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">サインアップ・クレカ・透かしすべて不要。長尺動画からバズりクリップを生成、または AI アクターであらゆるビジネス向けの UGC マーケ動画を作成。Docker でセルフホスト。</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchApp}
              className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-medium transition-all active:scale-[0.98] shadow-lg shadow-primary/20 text-lg"
            >
              OpenShorts を起動
              <ArrowRight size={20} />
            </button>
            <a
              href="https://github.com/mutonby/openshorts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
            >
              <Github size={18} />
              GitHub でスター
            </a>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo-openshorts.png" alt="OpenShorts" className="w-6 h-6" />
            <span className="text-sm text-zinc-400">OpenShorts — 無料・オープンソースのクリップジェネレータ & AI UGC 動画クリエイタ</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="https://github.com/mutonby/openshorts" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="#features" className="hover:text-white transition-colors">機能</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-6 pt-4 border-t border-white/5 text-center">
          <span className="text-xs text-zinc-600">Made with ❤️ by <a href="https://www.upload-post.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">Upload-Post</a></span>
        </div>
      </footer>
    </div>
  );
}
