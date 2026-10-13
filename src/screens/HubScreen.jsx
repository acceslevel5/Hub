import { useMemo, useRef, useState } from 'react'
import styles from './HubScreen.module.css'
import { useNav } from '../router/Navigator'
import { useSwipe } from '../router/useSwipe'
import closeIcon from '../assets/icons/close-24.svg'
import searchIcon from '../assets/icons/search-16.svg'
import chevronLeftIcon from '../assets/icons/chevron-left-16.svg'
import chevronRightIcon from '../assets/icons/chevron-right-16.svg'
import clearIcon from '../assets/icons/close-10-dark.svg'
import newBadge from '../assets/hub/new-badge.png'
import emptyIllustration from '../assets/illustrations/empty-search.svg'
import { hubProducts, hubQuickLinks, frequentSearches } from '../data/hub'
import { search } from '../utils/search'

function ProductTile({ product, onOpen }) {
  const [dx = 0, dy = 0] = product.offset || [-0.54, -0.54]
  return (
    <button type="button" className={`${styles.tile} pressable`} onClick={onOpen}>
      <span className={styles.thumb}>
        <img
          src={product.image}
          alt=""
          className={styles.thumbImage}
          style={{
            width: product.size,
            height: product.size,
            left: `calc(50% + ${dx}px)`,
            top: `calc(50% + ${dy}px)`,
            mixBlendMode: product.blend,
          }}
        />
      </span>
      <span className={`t-tile-label ${styles.tileLabel}`}>{product.title}</span>
      {product.isNew && <img className={styles.newBadge} src={newBadge} width="70" height="42" alt="NEW" />}
    </button>
  )
}

function ProductGrid({ title, products, onOpen }) {
  return (
    <section className={styles.section}>
      <h2 className="t-widget-title ellipsis">{title}</h2>
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductTile key={p.id} product={p} onOpen={p.route ? () => onOpen(p.route) : undefined} />
        ))}
      </div>
    </section>
  )
}

function QuickLinks({ items, onOpen }) {
  return (
    <div className={styles.quickLinks}>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          className={`${styles.quickLink} pressable`}
          onClick={it.route ? () => onOpen(it.route) : undefined}
        >
          <span className={styles.quickThumb}>
            <img src={it.image} width="56" height="56" alt="" />
          </span>
          <span className={`t-tile-label ${styles.quickLabel}`}>{it.title}</span>
        </button>
      ))}
    </div>
  )
}

function LinkList({ title, items, onOpen }) {
  return (
    <section className={styles.section}>
      <h2 className="t-widget-title ellipsis">{title}</h2>
      <div>
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            className={`${styles.linkRow} pressable`}
            onClick={it.route ? () => onOpen(it.route) : undefined}
          >
            <span className={styles.linkIcon}>
              <img src={it.icon} width="16" height="16" alt="" />
            </span>
            <span className={`t-list-body ${styles.linkLabel}`}>{it.title}</span>
            <img className={styles.linkChevron} src={chevronRightIcon} width="16" height="16" alt="" />
          </button>
        ))}
      </div>
    </section>
  )
}

function EmptyState() {
  return (
    <div className={styles.empty}>
      <img src={emptyIllustration} width="128" height="96" alt="" />
      <div className={styles.emptyText}>
        <p className="t-subtitle-large">ვერაფერი მოვძებნეთ</p>
        <p className={`t-body-medium ${styles.emptyDescription}`}>
          ამ საძიებო სიტყვით ვერაფერი ვიპვეთ, დარწმუნდით, რომ სწორად წერთ
        </p>
      </div>
    </div>
  )
}

/*
 * Hub & Search — Figma 3063:136102
 * მდგომარეობები: default (პროდუქტები) → active (ფოკუსი, „ხშირად მოძებნილი")
 *   → typing + შედეგები → empty state („ვერაფერი მოვძებნეთ", Figma 3091:153070)
 */
export default function HubScreen() {
  const { back, navigate } = useNav()
  const [active, setActive] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const [screenEl, setScreenEl] = useState(null)

  // მარჯვნიდან მარცხნივ სვაიპი ხურავს Hub-ს (მხოლოდ default მდგომარეობაში)
  useSwipe(screenEl, { onSwipeLeft: active ? undefined : back })

  const results = useMemo(() => {
    const quickLinks = search(hubQuickLinks, query)
    // „ვალუტის კურსი" ორივე სიაშია — შედეგებში ერთხელ ჩანს (სწრაფ ბმულად)
    const quickTitles = new Set(quickLinks.map((q) => q.title))
    const services = search(frequentSearches, query).filter((s) => !quickTitles.has(s.title))
    return { quickLinks, services, products: search(hubProducts, query) }
  }, [query])
  const hasQuery = query.trim().length > 0
  const hasResults = results.quickLinks.length + results.services.length + results.products.length > 0

  const exitSearch = () => {
    setQuery('')
    setActive(false)
    inputRef.current?.blur()
  }

  const clearQuery = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  // შედეგების სქროლისას კლავიატურა იმალება (iOS-ის მსგავსად)
  const hideKeyboard = () => {
    if (document.activeElement === inputRef.current) inputRef.current.blur()
  }

  let content
  if (!active) {
    content = (
      <>
        <QuickLinks items={hubQuickLinks} onOpen={navigate} />
        <ProductGrid title="პროდუქტები" products={hubProducts} onOpen={navigate} />
      </>
    )
  } else if (!hasQuery) {
    content = <LinkList title="ხშირად მოძებნილი" items={frequentSearches} onOpen={navigate} />
  } else if (!hasResults) {
    content = <EmptyState />
  } else {
    content = (
      <>
        {results.quickLinks.length > 0 && <QuickLinks items={results.quickLinks} onOpen={navigate} />}
        {results.services.length > 0 && <LinkList title="სერვისები" items={results.services} onOpen={navigate} />}
        {results.products.length > 0 && <ProductGrid title="პროდუქტები" products={results.products} onOpen={navigate} />}
      </>
    )
  }

  return (
    <div className={`${styles.screen} ${active ? styles.isActive : ''}`} ref={setScreenEl}>
      <main className={styles.scroll} onTouchMove={hideKeyboard}>
        <div className={styles.content}>{content}</div>
      </main>

      <div className={styles.blur} aria-hidden="true" />
      <header className={styles.bar}>
        <div className={styles.barContent}>
          <div className={styles.closeSlot}>
            <button type="button" className={`${styles.closeButton} pressable`} aria-label="დახურვა" onClick={back}>
              <img src={closeIcon} width="24" height="24" alt="" />
            </button>
          </div>
          <div
            className={`${styles.search} ${hasQuery ? styles.searchFilled : ''}`}
            onClick={(e) => e.target === e.currentTarget && inputRef.current?.focus()}
          >
            <span className={styles.searchInner}>
              {active ? (
                <button type="button" className={`${styles.searchLeading} pressable`} aria-label="ძიებიდან გასვლა" onClick={exitSearch}>
                  <img src={chevronLeftIcon} width="16" height="16" alt="" />
                </button>
              ) : (
                <img className={styles.searchLeading} src={searchIcon} width="16" height="16" alt="" />
              )}
              <input
                ref={inputRef}
                className={`t-body-medium ${styles.input}`}
                type="search"
                inputMode="search"
                enterKeyHint="search"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="ძებნა"
                value={query}
                onFocus={() => setActive(true)}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.blur()}
              />
            </span>
            {hasQuery && (
              <button
                type="button"
                className={`${styles.clear} pressable`}
                aria-label="გასუფთავება"
                onMouseDown={(e) => e.preventDefault()}
                onClick={clearQuery}
              >
                <img src={clearIcon} width="10" height="10" alt="" />
              </button>
            )}
          </div>
        </div>
      </header>
    </div>
  )
}
