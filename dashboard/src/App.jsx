import React, { useState, useEffect } from 'react';
import { Upload, FileVideo, Sparkles, Youtube, Instagram, Share2, LogOut, ChevronDown, Check, Activity, LayoutDashboard, Settings, PlusCircle, History, Menu, X, Terminal, Shield, LayoutGrid, Image, Globe, RotateCcw, Calendar } from 'lucide-react';
import KeyInput from './components/KeyInput';
import MediaInput from './components/MediaInput';
import ResultCard from './components/ResultCard';
import ProcessingAnimation from './components/ProcessingAnimation';
// import Gallery from './components/Gallery';
import ThumbnailStudio from './components/ThumbnailStudio';
import SaaShortsTab from './components/SaaShortsTab';
import UGCGallery from './components/UGCGallery';
import ScheduleWeekModal from './components/ScheduleWeekModal';
import { getApiUrl } from './config';

// XOR + Base64 + ソルトによる簡易「暗号化」
// 平文 Base64 よりはマシ、ただしクライアント側のみ
const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || "OpenShorts-Static-Salt-Change-Me";
const ENCRYPTION_PREFIX = "ENC:";

const encrypt = (text) => {
  if (!text) return '';
  try {
    const xor = text.split('').map((c, i) =>
      String.fromCharCode(c.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length))
    ).join('');
    return ENCRYPTION_PREFIX + btoa(xor);
  } catch (e) {
    console.error("暗号化に失敗", e);
    return text;
  }
};

const decrypt = (text) => {
  if (!text) return '';
  if (text.startsWith(ENCRYPTION_PREFIX)) {
    try {
      const raw = text.slice(ENCRYPTION_PREFIX.length);
      // 平文 Base64 か独自 XOR かを判定（簡易トライ）
      const xor = atob(raw);
      const result = xor.split('').map((c, i) =>
        String.fromCharCode(c.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length))
      ).join('');
      return result;
    } catch (e) {
      // 復号失敗時のフォールバック（古い平文の可能性）
      return '';
    }
  }
  // 後方互換: プレフィックスが無い場合は古い平文として扱う（再ログイン強制したい場合は空を返す）
  // マイグレーション用: そのまま返してフィールドに表示、次回保存時に暗号化される。
  return text;
};

// TikTok アイコン（Lucide に無い／差異があるため自前で）
const TikTokIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

const UserProfileSelector = ({ profiles, selectedUserId, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!profiles || profiles.length === 0) return null;

  const selectedProfile = profiles.find(p => p.username === selectedUserId) || profiles[0];

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between bg-surface border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors min-w-[180px]"
      >
        <span className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
            {selectedProfile?.username?.substring(0, 1).toUpperCase() || "U"}
          </div>
          <span className="font-medium text-white truncate max-w-[100px]">{selectedProfile?.username || "ユーザを選択"}</span>
        </span>
        <ChevronDown size={14} className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {profiles.map((profile) => (
              <button
                key={profile.username}
                onClick={() => {
                  onSelect(profile.username);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left group border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-xs font-bold text-white border border-white/10 shrink-0">
                    {profile.username.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors truncate">
                      {profile.username}
                    </div>
                    <div className="flex gap-2 mt-0.5">
                      {/* 接続状況インジケータ */}
                      <div className={`flex items-center gap-1 text-[10px] ${profile.connected.includes('tiktok') ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        <TikTokIcon size={10} />
                      </div>
                      <div className={`flex items-center gap-1 text-[10px] ${profile.connected.includes('instagram') ? 'text-pink-400' : 'text-zinc-600'}`}>
                        <Instagram size={10} />
                      </div>
                      <div className={`flex items-center gap-1 text-[10px] ${profile.connected.includes('youtube') ? 'text-red-400' : 'text-zinc-600'}`}>
                        <Youtube size={10} />
                      </div>
                    </div>
                  </div>
                </div>
                {selectedUserId === profile.username && <Check size={14} className="text-primary shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SESSION_KEY = 'openshorts_session';
const SESSION_MAX_AGE = 3600000; // 1 時間（サーバ側のジョブ保持時間と揃える）

// ジョブ状態のポーリング
const pollJob = async (jobId) => {
  const res = await fetch(getApiUrl(`/api/status/${jobId}`));
  if (!res.ok) throw new Error('ステータス取得に失敗');
  return res.json();
};

function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_key') || '');
  // ソーシャル API ステート - 暗号化済み or 平文を読み込み
  const [uploadPostKey, setUploadPostKey] = useState(() => {
    const stored = localStorage.getItem('uploadPostKey_v3');
    if (stored) return decrypt(stored);
    return '';
  });
  // ElevenLabs API ステート - 暗号化済みを読み込み
  const [elevenLabsKey, setElevenLabsKey] = useState(() => {
    const stored = localStorage.getItem('elevenLabsKey_v1');
    if (stored) return decrypt(stored);
    return '';
  });

  // fal.ai API ステート - 暗号化済みを読み込み
  const [falKey, setFalKey] = useState(() => {
    const stored = localStorage.getItem('falKey_v1');
    if (stored) return decrypt(stored);
    return '';
  });

  const [uploadUserId, setUploadUserId] = useState(() => localStorage.getItem('uploadUserId') || '');
  const [userProfiles, setUserProfiles] = useState([]); // {username, connected: []} のリスト
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState('idle'); // idle / processing / complete / error
  const [results, setResults] = useState(null);
  const [logs, setLogs] = useState([]);
  const [logsVisible, setLogsVisible] = useState(true);
  const [processingMedia, setProcessingMedia] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard / settings ほか

  const [sessionRecovered, setSessionRecovered] = useState(false);
  const [showScheduleWeek, setShowScheduleWeek] = useState(false);

  // 元動画プレビューの同期再生用ステート
  const [syncedTime, setSyncedTime] = useState(0);
  const [isSyncedPlaying, setIsSyncedPlaying] = useState(false);
  const [syncTrigger, setSyncTrigger] = useState(0);

  const handleClipPlay = (startTime) => {
    setSyncedTime(startTime);
    setIsSyncedPlaying(true);
    setSyncTrigger(prev => prev + 1);
  };

  const handleClipPause = () => {
    setIsSyncedPlaying(false);
  };

  // セッション復元: マウント時に復帰
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (!saved) return;
      const session = JSON.parse(saved);
      if (Date.now() - session.timestamp > SESSION_MAX_AGE) {
        localStorage.removeItem(SESSION_KEY);
        return;
      }
      if (session.jobId && session.status && session.status !== 'idle') {
        setJobId(session.jobId);
        setResults(session.results || null);
        if (session.processingMedia) setProcessingMedia(session.processingMedia);
        if (session.activeTab) setActiveTab(session.activeTab);
        // 処理中だったらポーリング再開、complete/error なら結果を表示するだけ
        setStatus(session.status === 'processing' ? 'processing' : session.status);
        setSessionRecovered(true);
        setTimeout(() => setSessionRecovered(false), 5000);
      }
    } catch (e) {
      localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  // セッション復元: 状態変更を保存
  useEffect(() => {
    if (status === 'idle') {
      localStorage.removeItem(SESSION_KEY);
      return;
    }
    try {
      const sessionData = {
        jobId,
        status,
        results,
        processingMedia: processingMedia?.type === 'url' ? processingMedia : null,
        activeTab,
        timestamp: Date.now()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    } catch (e) {
      // localStorage 容量不足やシリアライズ失敗は無視
    }
  }, [jobId, status, results, activeTab]);

  useEffect(() => {
    // Gemini キーも揃えて暗号化することは可能だが、ユーザ要望はソーシャル連携保存の改善が中心。
    // 互換性のため当面 Gemini は平文のまま（要望があれば暗号化）。
    if (apiKey) localStorage.setItem('gemini_key', apiKey);
  }, [apiKey]);

  useEffect(() => {
    if (uploadPostKey) {
      localStorage.setItem('uploadPostKey_v3', encrypt(uploadPostKey));
    }
    if (uploadUserId) {
      localStorage.setItem('uploadUserId', uploadUserId);
    }
  }, [uploadPostKey, uploadUserId]);

  useEffect(() => {
    if (elevenLabsKey) {
      localStorage.setItem('elevenLabsKey_v1', encrypt(elevenLabsKey));
    }
  }, [elevenLabsKey]);

  useEffect(() => {
    if (falKey) {
      localStorage.setItem('falKey_v1', encrypt(falKey));
    }
  }, [falKey]);

  useEffect(() => {
    if (uploadPostKey && userProfiles.length === 0) {
      fetchUserProfiles();
    }
  }, [uploadPostKey]);

  useEffect(() => {
    let interval;
    if ((status === 'processing' || status === 'completed') && jobId) {
      interval = setInterval(async () => {
        try {
          const data = await pollJob(jobId);
          console.log("ジョブ状態:", data);

          // 結果が来ていれば反映（リアルタイム）
          if (data.result) {
            setResults(data.result);
          }

          if (data.status === 'completed') {
            setStatus('complete');
            clearInterval(interval);
          } else if (data.status === 'failed') {
            setStatus('error');
            const errorMsg = data.error || (data.logs && data.logs.length > 0 ? data.logs[data.logs.length - 1] : "処理に失敗しました");
            setLogs(prev => [...prev, "エラー: " + errorMsg]);
            clearInterval(interval);
          } else {
            // ログ更新
            if (data.logs) setLogs(data.logs);
          }
        } catch (e) {
          console.error("ポーリングエラー", e);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [status, jobId]);


  const fetchUserProfiles = async () => {
    if (!uploadPostKey) return;
    try {
      const res = await fetch(getApiUrl('/api/social/user'), {
        headers: { 'X-Upload-Post-Key': uploadPostKey }
      });
      if (!res.ok) throw new Error("取得に失敗しました");
      const data = await res.json();
      if (data.profiles && data.profiles.length > 0) {
        setUserProfiles(data.profiles);
        // 未選択なら先頭を自動選択
        if (!uploadUserId) {
          setUploadUserId(data.profiles[0].username);
        }
      } else {
        alert("この API キーに紐づくプロファイルがありません。");
      }
    } catch (e) {
      alert("ユーザプロファイルの取得に失敗しました。キーを確認してください。");
      console.error(e);
    }
  };

  const handleProcess = async (data) => {
    if (!apiKey) {
      setShowKeyModal(true);
      return;
    }
    setStatus('processing');
    setLogs(["処理を開始しています..."]);
    setResults(null);
    setProcessingMedia(data);

    try {
      let body;
      const headers = { 'X-Gemini-Key': apiKey };

      if (data.type === 'url') {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify({ url: data.payload });
      } else {
        const formData = new FormData();
        formData.append('file', data.payload);
        body = formData;
      }

      const res = await fetch(getApiUrl('/api/process'), {
        method: 'POST',
        headers: data.type === 'url' ? headers : { 'X-Gemini-Key': apiKey },
        body
      });

      if (!res.ok) throw new Error(await res.text());
      const resData = await res.json();
      setJobId(resData.job_id);

    } catch (e) {
      setStatus('error');
      setLogs(l => [...l, `ジョブ開始時のエラー: ${e.message}`]);
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setJobId(null);
    setResults(null);
    setLogs([]);
    setProcessingMedia(null);
    localStorage.removeItem(SESSION_KEY);
  };

  // --- UI コンポーネント ---

  const Sidebar = () => (
    <div className="w-20 lg:w-64 bg-surface border-r border-white/5 flex flex-col h-full shrink-0 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0 overflow-hidden border border-white/5">
          <img src="/logo-openshorts.png" alt="Logo" className="w-full h-full object-cover" />
        </div>
        <span className="font-bold text-lg text-white hidden lg:block tracking-tight">OpenShorts</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-primary/10 text-primary' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
        >
          <LayoutDashboard size={20} />
          <span className="font-medium hidden lg:block">クリップ生成</span>
        </button>

        <button
          onClick={() => setActiveTab('saasshorts')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${activeTab === 'saasshorts' ? 'bg-violet-500/10 text-violet-400' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
        >
          <Sparkles size={20} />
          <span className="font-medium hidden lg:block">AI Shorts</span>
        </button>

        <button
          onClick={() => setActiveTab('ugc-gallery')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${activeTab === 'ugc-gallery' ? 'bg-violet-500/10 text-violet-400' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
        >
          <LayoutGrid size={20} />
          <span className="font-medium hidden lg:block">UGC ギャラリー</span>
        </button>

        <button
          onClick={() => setActiveTab('thumbnails')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${activeTab === 'thumbnails' ? 'bg-primary/10 text-primary' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
        >
          <Image size={20} />
          <span className="font-medium hidden lg:block">YouTube Studio</span>
        </button>

        {/* <button
          onClick={() => setActiveTab('gallery')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${activeTab === 'gallery' ? 'bg-primary/10 text-primary' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
        >
          <LayoutGrid size={20} />
          <span className="font-medium hidden lg:block">Gallery</span>
        </button> */}

        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
        >
          <Settings size={20} />
          <span className="font-medium hidden lg:block">設定</span>
        </button>
      </nav>

      <div className="p-4 border-t border-white/5 space-y-2">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); localStorage.removeItem('openshorts_skip_landing'); window.location.hash = ''; window.location.reload(); }}
          className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <Globe size={16} />
          </div>
          <div className="hidden lg:block overflow-hidden">
            <p className="text-sm font-bold text-white leading-none mb-0.5">ランディング</p>
            <p className="text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors truncate">サイトを見る</p>
          </div>
        </a>
        <a
          href="https://github.com/mutonby/openshorts"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0">
            <svg height="20" viewBox="0 0 16 16" version="1.1" width="20" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
          </div>
          <div className="hidden lg:block overflow-hidden">
            <p className="text-sm font-bold text-white leading-none mb-0.5">オープンソース</p>
            <p className="text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors truncate">無料 & コミュニティ駆動</p>
          </div>
        </a>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* 背景グラデーション */}
        <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        {/* トップヘッダー */}
        <header className="h-16 border-b border-white/5 bg-background/50 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            {status !== 'idle' && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <PlusCircle size={16} />
                <span className="hidden sm:inline">新規プロジェクト</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {userProfiles.length > 0 && (
              <UserProfileSelector
                profiles={userProfiles}
                selectedUserId={uploadUserId}
                onSelect={setUploadUserId}
              />
            )}

            {!apiKey && (
              <span className="text-xs text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                API キー未設定
              </span>
            )}
          </div>
        </header>

        {/* セッション復元バナー */}
        {sessionRecovered && (
          <div className="mx-6 mt-2 p-3 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-between animate-[fadeIn_0.3s_ease-out] shrink-0">
            <div className="flex items-center gap-2 text-sm text-primary">
              <RotateCcw size={16} />
              <span className="font-medium">セッションを復元しました</span>
              <span className="text-zinc-400 text-xs">前回の作業を復元しました。</span>
            </div>
            <button onClick={() => setSessionRecovered(false)} className="text-zinc-500 hover:text-white transition-colors">
              <X size={14} />
            </button>
          </div>
        )}

        {/* メインワークスペース */}
        <div className="flex-1 overflow-hidden relative">

          {/* ビュー: 設定 */}
          {activeTab === 'settings' && (
            <div className="h-full overflow-y-auto p-8 max-w-2xl mx-auto animate-[fadeIn_0.3s_ease-out]">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">設定</h1>
                <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] text-green-400 font-medium flex items-center gap-2">
                  <Shield size={12} /> プライバシー: キーはブラウザにのみ保存（処理時のみバックエンドに送信）
                </div>
              </div>
              <KeyInput onKeySet={setApiKey} savedKey={apiKey} />

              <div className="glass-panel p-6 mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">SNS 連携</h2>
                  <span className="text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-zinc-500 uppercase tracking-wider">任意</span>
                </div>
                <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                  <strong>Upload-Post</strong> 経由で TikTok・Instagram Reels・YouTube Shorts へ自動投稿。
                  <strong>無料枠あり</strong>（クレカ不要）。
                  使わない場合は手動でダウンロード／アップロードでも構いません。
                </p>
                <div className="space-y-4">
                  <label className="block text-sm text-zinc-400">Upload-Post API キー</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={uploadPostKey}
                      onChange={(e) => setUploadPostKey(e.target.value)}
                      className="input-field"
                      placeholder="ey..."
                    />
                    <button onClick={fetchUserProfiles} className="btn-primary py-2 px-4 text-sm">
                      接続
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Upload-Post アカウントを接続するとワンクリックで投稿できます。
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <a href="https://app.upload-post.com/login" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/5 rounded-lg hover:bg-white/5 transition-colors flex flex-col gap-1">
                        <span className="text-zinc-400 font-medium">1. ログイン</span>
                        <span className="text-[10px] text-zinc-600">アカウント登録</span>
                      </a>
                      <a href="https://app.upload-post.com/manage-users" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/5 rounded-lg hover:bg-white/5 transition-colors flex flex-col gap-1">
                        <span className="text-zinc-400 font-medium">2. プロファイル</span>
                        <span className="text-[10px] text-zinc-600">作成と接続</span>
                      </a>
                      <a href="https://app.upload-post.com/api-keys" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/5 rounded-lg hover:bg-white/5 transition-colors flex flex-col gap-1">
                        <span className="text-zinc-400 font-medium">3. API キー</span>
                        <span className="text-[10px] text-zinc-600">キーを発行</span>
                      </a>
                    </div>
                    <br />
                    <span className="text-zinc-600 italic">
                      キーはブラウザにのみ保存されます。リクエスト処理時のみバックエンドに送信され、サーバ側には保存されません。
                    </span>
                  </p>
                </div>
              </div>

              <div className="glass-panel p-6 mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">動画翻訳</h2>
                  <span className="text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-zinc-500 uppercase tracking-wider">任意</span>
                </div>
                <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                  <strong>ElevenLabs</strong> AI 吹き替えでクリップを多言語化。
                  元話者の声質を保ったまま音声を翻訳します。
                </p>
                <div className="space-y-4">
                  <label className="block text-sm text-zinc-400">ElevenLabs API キー</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={elevenLabsKey}
                      onChange={(e) => setElevenLabsKey(e.target.value)}
                      className="input-field"
                      placeholder="sk_..."
                    />
                    <button
                      onClick={() => {
                        if (elevenLabsKey) {
                          localStorage.setItem('elevenLabsKey_v1', encrypt(elevenLabsKey));
                          alert('ElevenLabs API キーを保存しました');
                        }
                      }}
                      className="btn-primary py-2 px-4 text-sm"
                    >
                      保存
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    ElevenLabs から API キーを取得して動画翻訳を有効化してください。
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a href="https://elevenlabs.io/sign-up" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/5 rounded-lg hover:bg-white/5 transition-colors flex flex-col gap-1">
                        <span className="text-zinc-400 font-medium">1. サインアップ</span>
                        <span className="text-[10px] text-zinc-600">アカウント作成</span>
                      </a>
                      <a href="https://elevenlabs.io/app/settings/api-keys" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/5 rounded-lg hover:bg-white/5 transition-colors flex flex-col gap-1">
                        <span className="text-zinc-400 font-medium">2. API キー</span>
                        <span className="text-[10px] text-zinc-600">キーを発行</span>
                      </a>
                    </div>
                    <br />
                    <span className="text-zinc-600 italic">
                      キーはブラウザにのみ保存されます。リクエスト処理時のみバックエンドに送信され、サーバ側には保存されません。
                    </span>
                  </p>
                </div>
              </div>

              <div className="glass-panel p-6 mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">AI Shorts（UGC 動画）</h2>
                  <span className="text-[10px] bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded text-violet-400 uppercase tracking-wider">新機能</span>
                </div>
                <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                  <strong>fal.ai</strong> を使ってあらゆる商品・ビジネス向けに AI アクター付き UGC 動画を生成。
                  商品を説明するか URL を貼るだけ。fal.ai + ElevenLabs の API キーが必要です。
                </p>
                <div className="space-y-4">
                  <label className="block text-sm text-zinc-400">fal.ai API キー</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={falKey}
                      onChange={(e) => setFalKey(e.target.value)}
                      className="input-field"
                      placeholder="fal_..."
                    />
                    <button
                      onClick={() => {
                        if (falKey) {
                          localStorage.setItem('falKey_v1', encrypt(falKey));
                          alert('fal.ai API キーを保存しました');
                        }
                      }}
                      className="btn-primary py-2 px-4 text-sm"
                    >
                      保存
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    fal.ai から API キーを取得して AI アクター動画生成を有効化してください。
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a href="https://fal.ai/dashboard/keys" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/5 rounded-lg hover:bg-white/5 transition-colors flex flex-col gap-1">
                        <span className="text-zinc-400 font-medium">1. サインアップ</span>
                        <span className="text-[10px] text-zinc-600">fal.ai アカウント作成</span>
                      </a>
                      <a href="https://fal.ai/dashboard/keys" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/5 rounded-lg hover:bg-white/5 transition-colors flex flex-col gap-1">
                        <span className="text-zinc-400 font-medium">2. API キー</span>
                        <span className="text-[10px] text-zinc-600">キーを発行</span>
                      </a>
                    </div>
                    <br />
                    <span className="text-zinc-600 italic">
                      キーはブラウザにのみ保存されます。リクエスト処理時のみバックエンドに送信されます。
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ビュー: AI Shorts */}
          {activeTab === 'saasshorts' && (
            <SaaShortsTab geminiApiKey={apiKey} elevenLabsKey={elevenLabsKey} falKey={falKey} uploadPostKey={uploadPostKey} uploadUserId={uploadUserId} />
          )}

          {/* ビュー: UGC ギャラリー */}
          {activeTab === 'ugc-gallery' && (
            <UGCGallery />
          )}

          {/* ビュー: サムネイル */}
          {activeTab === 'thumbnails' && (
            <ThumbnailStudio geminiApiKey={apiKey} uploadPostKey={uploadPostKey} uploadUserId={uploadUserId} />
          )}

          {/* ビュー: ギャラリー */}
          {/* {activeTab === 'gallery' && (
            <Gallery />
          )} */}

          {/* ビュー: ダッシュボード（待機中） */}
          {activeTab === 'dashboard' && status === 'idle' && (
            <div className="h-full flex flex-col items-center justify-center p-6 animate-[fadeIn_0.3s_ease-out]">
              <div className="max-w-xl w-full text-center space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                    バズるショートを作る
                  </h1>
                  <p className="text-zinc-400 text-lg">
                    長尺動画の URL かファイルを下にドロップ。AI が即座にバズり用クリップを生成します。
                  </p>
                </div>

                <MediaInput onProcess={handleProcess} isProcessing={status === 'processing'} />

                <div className="flex items-center justify-center gap-8 text-zinc-500 text-sm">
                  <span className="flex items-center gap-2"><Youtube size={16} /> YouTube</span>
                  <span className="flex items-center gap-2"><Instagram size={16} /> Instagram</span>
                  <span className="flex items-center gap-2"><TikTokIcon size={16} /> TikTok</span>
                </div>
              </div>
            </div>
          )}

          {/* ビュー: 処理中／結果（分割ビュー） */}
          {activeTab === 'dashboard' && (status === 'processing' || status === 'complete' || status === 'error') && (
            <div className="h-full flex flex-col md:flex-row animate-[fadeIn_0.3s_ease-out]">

              {/* 左パネル: プレビューとステータス */}
              <div className={`${status === 'complete' ? 'w-full md:w-[30%] lg:w-[25%]' : 'w-full md:w-[55%] lg:w-[60%]'} h-full flex flex-col border-r border-white/5 bg-black/20 p-6 overflow-y-auto custom-scrollbar transition-all duration-700 ease-in-out`}>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Activity className={`text-primary ${status === 'processing' ? 'animate-pulse' : ''}`} size={20} />
                    リアルタイム解析
                  </h2>
                  <span className={`text-xs px-2 py-1 rounded-full border ${status === 'processing' ? 'bg-primary/10 border-primary/20 text-primary' :
                    status === 'complete' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                      'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                    {status.toUpperCase()}
                  </span>
                </div>

                {/* 動画プレビュー */}
                {processingMedia && (
                  <ProcessingAnimation
                    media={processingMedia}
                    isComplete={status === 'complete'}
                    syncedTime={syncedTime}
                    isSyncedPlaying={isSyncedPlaying}
                    syncTrigger={syncTrigger}
                  />
                )}

                {/* ログ表示 */}
                <div className={`bg-[#0c0c0e] rounded-xl border border-white/10 overflow-hidden flex flex-col transition-all duration-500 ${status === 'complete' ? 'h-32 min-h-0 opacity-50 hover:opacity-100' : 'flex-1 min-h-[200px]'}`}>
                  <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between bg-white/5 shrink-0">
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-2">
                      <Terminal size={12} /> システムログ
                    </span>
                    <button onClick={() => setLogsVisible(!logsVisible)} className="text-zinc-500 hover:text-white transition-colors">
                      {logsVisible ? <ChevronDown size={14} /> : <ChevronDown size={14} className="rotate-180" />}
                    </button>
                  </div>
                  {logsVisible && (
                    <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1.5 custom-scrollbar text-zinc-400">
                      {logs.map((log, i) => (
                        <div key={i} className={`flex gap-2 ${log.toLowerCase().includes('error') ? 'text-red-400' : 'text-zinc-400'}`}>
                          <span className="text-zinc-700 shrink-0">{new Date().toLocaleTimeString()}</span>
                          <span>{log}</span>
                        </div>
                      ))}
                      {status === 'processing' && (
                        <div className="animate-pulse text-primary/70">_</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 右パネル: 結果グリッド */}
              <div className={`${status === 'complete' ? 'w-full md:w-[70%] lg:w-[75%]' : 'w-full md:w-[45%] lg:w-[40%]'} h-full flex flex-col bg-background p-6 transition-all duration-700 ease-in-out`}>
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 shrink-0">
                  <Sparkles className="text-yellow-400" size={20} />
                  生成されたショート
                  {results?.clips?.length > 0 && (
                    <span className="text-xs bg-white/10 text-white px-2 py-0.5 rounded-full ml-auto">
                      {results.clips.length} クリップ
                    </span>
                  )}
                  {results?.cost_analysis && (
                    <span className="text-xs bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-0.5 rounded-full ml-2" title={`入力: ${results.cost_analysis.input_tokens} | 出力: ${results.cost_analysis.output_tokens}`}>
                      ${results.cost_analysis.total_cost.toFixed(5)}
                    </span>
                  )}
                  {results?.clips?.length > 1 && status === 'complete' && (
                    <button
                      onClick={() => setShowScheduleWeek(true)}
                      className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 border border-purple-500/30 text-purple-300 hover:text-purple-200 rounded-full text-xs font-bold transition-all"
                    >
                      <Calendar size={14} />
                      週次スケジュール
                    </button>
                  )}
                </h2>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
                  {results && results.clips && results.clips.length > 0 ? (
                    <div className={`grid gap-4 pb-10 ${status === 'complete' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
                      {results.clips.map((clip, i) => (
                        <ResultCard
                          key={i}
                          clip={clip}
                          index={i}
                          jobId={jobId}
                          uploadPostKey={uploadPostKey}
                          uploadUserId={uploadUserId}
                          geminiApiKey={apiKey}
                          elevenLabsKey={elevenLabsKey}
                          onPlay={(time) => handleClipPlay(time)}
                          onPause={handleClipPause}
                        />
                      ))}
                    </div>
                  ) : (
                    status === 'processing' ? (
                      <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4 opacity-50">
                        <div className="w-12 h-12 rounded-full border-2 border-zinc-800 border-t-primary animate-spin" />
                        <p className="text-sm">クリップを待機中...</p>
                      </div>
                    ) : status === 'error' ? (
                      <div className="h-full flex flex-col items-center justify-center text-red-400 space-y-2">
                        <p>生成に失敗しました。</p>
                      </div>
                    ) : null
                  )}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* フッター */}
        <div className="h-8 border-t border-white/5 flex items-center justify-center shrink-0">
          <span className="text-[10px] text-zinc-600">Made with ❤️ by <a href="https://www.upload-post.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">Upload-Post</a></span>
        </div>
      </main>

      {/* API キー未設定モーダル */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowKeyModal(false)}>
          <div className="bg-[#18181b] border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4 space-y-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-white">Gemini API キーが必要です</h2>
            <p className="text-sm text-zinc-400">
              クリップ生成を使うには Google Gemini API キーが必要です。無料・30 秒で取得できます。
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
              <p className="text-xs font-semibold text-zinc-300">無料キーの取得方法:</p>
              <ol className="text-xs text-zinc-400 space-y-1 list-decimal list-inside">
                <li><a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">aistudio.google.com/app/apikey</a> にアクセス</li>
                <li>Google アカウントでログイン</li>
                <li>「Create API Key」をクリック</li>
                <li>キーをコピーして下に貼り付け</li>
              </ol>
            </div>
            <input
              type="text"
              placeholder="Gemini API キーをここに貼り付け..."
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  setApiKey(e.target.value.trim());
                  setShowKeyModal(false);
                }
              }}
            />

            {/* Upload-Post 案内 */}
            <div className="bg-violet-500/5 border border-violet-500/20 rounded-lg p-4 space-y-2">
              <p className="text-xs font-semibold text-violet-300">任意: SNS への自動投稿</p>
              <p className="text-xs text-zinc-400">
                <strong className="text-zinc-300">Upload-Post</strong> の API キーがあれば TikTok・Instagram Reels・YouTube Shorts へ直接投稿、または後で投稿する予約も可能です。無料枠あり、クレカ不要。
              </p>
              <ol className="text-xs text-zinc-400 space-y-1 list-decimal list-inside">
                <li><a href="https://app.upload-post.com/login" target="_blank" rel="noopener noreferrer" className="text-violet-400 underline">app.upload-post.com</a> で登録</li>
                <li>TikTok / Instagram / YouTube アカウントを接続</li>
                <li>API Keys から発行</li>
                <li>設定画面に貼り付けて完了</li>
              </ol>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowKeyModal(false)}
                className="flex-1 text-sm text-zinc-400 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={() => { setShowKeyModal(false); setActiveTab('settings'); }}
                className="flex-1 text-sm text-white py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors font-medium"
              >
                設定へ
              </button>
            </div>
          </div>
        </div>
      )}

      <ScheduleWeekModal
        isOpen={showScheduleWeek}
        onClose={() => setShowScheduleWeek(false)}
        clips={results?.clips || []}
        jobId={jobId}
        uploadPostKey={uploadPostKey}
        uploadUserId={uploadUserId}
      />
    </div>
  );
}

export default App;
