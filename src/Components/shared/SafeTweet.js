import { getTweet } from 'react-tweet/api'
import { EmbeddedTweet } from 'react-tweet'

function tweetIdFromUrl(url) {
  const match = url?.match(/status(?:es)?\/(\d+)/)
  return match ? match[1] : null
}

function TweetLinkFallback({ url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-red-200 transition-all"
    >
      <svg className="h-5 w-5 shrink-0 text-gray-900" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900">View post on X</p>
        <p className="text-xs text-gray-400 truncate">{url}</p>
      </div>
    </a>
  )
}

/**
 * Server component that renders an embedded tweet, but never lets a failed
 * fetch to X's syndication CDN crash or slow down the page. On any failure
 * (network blocked, timeout, deleted/protected post) it renders a plain
 * link card instead.
 */
export default async function SafeTweet({ url }) {
  const id = tweetIdFromUrl(url)
  if (!id) return <TweetLinkFallback url={url} />

  let tweet = null
  try {
    // Cap the fetch at 4s so an unreachable CDN can't stall page rendering
    tweet = await getTweet(id, { signal: AbortSignal.timeout(4000) })
  } catch {
    // swallow — fall through to the link fallback
  }

  if (!tweet) return <TweetLinkFallback url={url} />

  return (
    <div data-theme="light" className="[&_.react-tweet-theme]:!my-0 [&_.react-tweet-theme]:!max-w-none">
      <EmbeddedTweet tweet={tweet} />
    </div>
  )
}
