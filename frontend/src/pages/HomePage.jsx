import React from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents.js';

export function HomePage() {
  const { data, isLoading } = useEvents({ limit: 3 });
  const dynamicEvents = data?.data || [];

  return (
    <>
      
{/* ========================================================================= */}
{/* 1. SHARED COMPONENT: TopNavBar (Exact mapping from JSON & Style Specs) */}
{/* ========================================================================= */}

{/* ========================================================================= */}
{/* 2. HERO SECTION: Asymmetrical 12-Column Editorial Grid */}
{/* ========================================================================= */}
<section className="border-b border-outline-variant bg-surface-container-high">
<div className="w-full grid grid-cols-1 lg:grid-cols-12 border-collapse">
{/* Left Column (7 Columns): Manifesto Anchor */}
<div className="lg:col-span-7 p-4 sm:p-space-md lg:p-space-xl border-b lg:border-b-0 lg:border-r border-outline-variant flex flex-col justify-between">
<div>
{/* Tag Header */}
<div className="flex flex-wrap items-center gap-3 mb-space-lg">
<span className="font-label-mono text-label-mono text-primary-container tracking-widest bg-surface-container-low px-2 py-0.5 border border-outline-variant text-[10px] sm:text-label-mono">
              // CAMPUS NODE: ACM &amp; OPEN-SOURCE CORE
            </span>
<span className="hidden sm:inline font-ticker-mono text-ticker-mono text-on-surface-variant">
              LAT: 42.3601° N // LON: 71.0942° W
            </span>
</div>
{/* Massive Editorial Statement */}
<h1 className="font-display-xl text-[36px] sm:text-[48px] lg:text-display-xl text-primary uppercase font-extrabold tracking-tighter leading-none mb-space-lg">
            FOR BUILDERS <br />
<span className="italic font-light text-on-surface-variant">WHO REFUSE</span> <br />
            TO WRITE <span className="bg-primary-container text-surface-container-lowest px-2 py-0.5 font-headline-sm tracking-normal inline-block align-middle text-[14px] sm:text-[16px] lg:text-headline-sm">{"{"}BOILERPLATE{"}"}  </span>
</h1>
{/* Dossier Subtitle */}
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-space-xl leading-relaxed border-l-2 border-outline-variant pl-4">
            An autonomous engineering syndicate at university. We compete in ICPC World Finals, benchmark bare-metal compilers, build zero-overhead virtualization runtimes, and deploy production software after midnight.
          </p>
{/* Interactive Action Triggers */}
<div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-space-md mb-space-xl">
<a className="bg-primary-container text-surface-container-lowest px-5 py-3 font-headline-sm text-headline-sm font-bold flex items-center gap-3 hover:-translate-x-0.5 hover:-translate-y-0.5 hard-shadow-citron active:translate-x-0 active:translate-y-0 transition-none border border-primary-container" href="#contests">
<span className="">ENTER CONTEST ARENA</span>
<span className="font-label-mono text-label-mono bg-surface-container-lowest text-primary-container px-1.5 py-0.5">[â†’]</span>
</a>
<button className="bg-surface-container-low border border-outline text-on-surface hover:border-primary-container hover:text-primary-container px-4 py-3 font-code-md text-code-md flex items-center gap-2 transition-none" onClick={() => { navigator.clipboard.writeText('git clone https://github.com/kernel-collective/manifesto.git'); alert('Manifesto URI copied to clipboard.'); }}>
<span className="text-outline">$</span>
<span className="">git clone manifesto.git</span>
<span className="material-symbols-outlined text-[16px] ml-1 text-on-surface-variant">content_copy</span>
</button>
</div>
</div>
{/* Live Community Diagnostic Metrics Strip */}
<div className="pt-space-md border-t border-outline-variant flex flex-wrap items-center justify-between gap-4 font-label-mono text-label-mono text-on-surface-variant">
<div className="flex items-center gap-2">
<span className="w-2 h-2 bg-primary-container inline-block"></span>
<span className="text-primary font-bold">480+</span> ACTIVE BUILDERS
          </div>
<div className="hidden sm:inline-block text-outline">|</div>
<div className="flex items-center gap-2">
<span className="w-2 h-2 bg-secondary-container inline-block"></span>
<span className="text-primary font-bold">TOP 3</span> ICPC REGIONALS
          </div>
<div className="hidden sm:inline-block text-outline">|</div>
<div className="flex items-center gap-2">
<span className="text-primary font-bold">14</span> OPEN SOURCE UTILITIES
          </div>
<div className="hidden sm:inline-block text-outline">|</div>
<div className="text-outline">
            RUNTIME: <span className="text-primary-container font-mono">0.42ms</span>
</div>
</div>
</div>
{/* Right Column (5 Columns): Interactive Code Editor & Live Judge Simulator */}
<div className="lg:col-span-5 p-4 sm:p-space-md lg:p-space-lg flex flex-col justify-between bg-surface-container-high">
<div>
{/* Code Buffer Tab Header */}
<div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-space-md font-label-mono text-label-mono">
<div className="flex items-center gap-2 text-primary">
<span className="material-symbols-outlined text-[16px] text-primary-container">terminal</span>
<span className="font-bold">LIVE CONTEST ENGINE // PROMPT #842</span>
</div>
<span className="px-1.5 py-0.5 bg-surface-container-high text-primary-container border border-outline-variant text-[10px]">
              DIV_1 [HARD]
            </span>
</div>
{/* Problem Metadata Ledger */}
<div className="bg-surface-container-low border border-outline-variant p-3 mb-space-md font-code-md text-code-md text-on-surface-variant space-y-1">
<div className="text-primary font-bold">PROBLEM: Graph Partitioning with Min Vertex Cut</div>
<div className="flex flex-wrap gap-4 text-xs font-label-mono text-label-mono">
<span className="text-outline">TIME_LIMIT: <span className="text-on-surface">1.000s</span></span>
<span className="text-outline">MEM_LIMIT: <span className="text-on-surface">256MB</span></span>
<span className="text-outline">SYS: <span className="text-primary-container">GCC 13.2 / C++20</span></span>
</div>
</div>
{/* Code Buffer with Syntax Stylings */}
<div className="bg-surface-container border border-outline-variant font-code-md text-code-md p-4 text-on-surface overflow-x-auto relative max-w-full">
<div className="absolute top-2 right-2 text-xs font-label-mono text-outline select-none">solution.cpp</div>
<pre className="leading-relaxed"><code><span className="text-secondary-container">#include</span> <span className="text-on-surface-variant"><iostream></iostream></span>
<span className="text-secondary-container">#include</span> <span className="text-on-surface-variant"><vector></vector></span>
<span className="text-secondary-container">#include</span> <span className="text-on-surface-variant"><queue></queue></span>

<span className="text-primary-container">using namespace</span> std;

<span className="text-outline">// Dinic's Algorithm for min-cut partition</span>
<span className="text-primary-container">struct</span> <span className="text-primary font-bold">Edge</span> {"{"} <span className="text-primary-container">int</span> to, cap, flow, rev; {"}"};
vector&lt;vector&lt;edge&gt;&gt; adj;

<span className="text-primary-container">bool</span> <span className="text-tertiary font-bold">bfs</span>(<span className="text-primary-container">int</span> s, <span className="text-primary-container">int</span> t, vector&lt;<span className="text-primary-container">int</span>&gt;&amp; level) {"{"}
    fill(level.begin(), level.end(), -1);
    level[s] = <span className="text-primary-container">0</span>;
    queue&lt;<span className="text-primary-container">int</span>&gt; q; q.push(s);
    <span className="text-primary-container">while</span>(!q.empty()) {"{"}
        <span className="text-primary-container">int</span> v = q.front(); q.pop();
        <span className="text-primary-container">for</span>(<span className="text-primary-container">auto</span>&amp; e : adj[v]) {"{"}
            <span className="text-primary-container">if</span>(e.cap - e.flow &gt; <span className="text-primary-container">0</span> &amp;&amp; level[e.to] == -1) {"{"}
                level[e.to] = level[v] + <span className="text-primary-container">1</span>;
                q.push(e.to);
            {"}"}
        {"}"}
    {"}"}
    <span className="text-primary-container">return</span> level[t] != -1;
{"}"}&lt;/vector&lt;edge&gt;</code></pre>
</div>
</div>
{/* Real-Time Interactive Test Runner Ledger */}
<div className="mt-space-md border border-outline-variant bg-surface-container-low p-3 font-label-mono text-label-mono">
<div className="flex items-center justify-between pb-2 border-b border-outline-variant mb-2">
<span className="text-on-surface font-bold flex items-center gap-1.5">
<span className="inline-block w-2 h-2 bg-primary-container"></span>
              SANDBOX EXECUTION HARNESS
            </span>
<button className="bg-primary-container text-surface-container-lowest px-2 py-0.5 font-bold hover:bg-white text-[10px]" id="run-sim-btn" onClick={() => { runBenchmarkSimulation() }}>
              RUN BENCHMARK [F5]
            </button>
</div>
<div className="space-y-1.5 text-xs" id="test-results-container">
<div className="flex items-center justify-between bg-surface-container px-2 py-1">
<span className="text-on-surface">CASE 01: [N=10^4, M=5*10^5]</span>
<span className="text-primary-container font-bold">â–  ACCEPTED [12ms]</span>
</div>
<div className="flex items-center justify-between bg-surface-container px-2 py-1">
<span className="text-on-surface">CASE 02: [DENSE COMPLETE BIPARTITE]</span>
<span className="text-primary-container font-bold">â–  ACCEPTED [18ms]</span>
</div>
<div className="flex items-center justify-between bg-surface-container px-2 py-1">
<span className="text-on-surface">CASE 03: [SPARSE DISCONNECTED MESH]</span>
<span className="text-primary-container font-bold">â–  ACCEPTED [12ms]</span>
</div>
</div>
<div className="mt-2 pt-2 border-t border-outline-variant flex items-center justify-between text-[11px]">
<span className="text-outline">VERDICT: <span className="text-primary font-bold">14/14 PASS</span></span>
<span className="text-primary-container font-bold">ALL TESTS PASSED (42ms)</span>
</div>
</div>
</div>
</div>
</section>
{/* ========================================================================= */}
{/* 3. FULL-BLEED LIVE CONTEST TICKER BAND */}
{/* ========================================================================= */}
<div className="w-full bg-primary-container text-surface-container-lowest py-2 border-b border-outline-variant overflow-hidden font-ticker-mono text-ticker-mono font-extrabold uppercase tracking-wide select-none">
<div className="animate-marquee whitespace-nowrap flex items-center">
<span className="mx-6">â˜… ICPC WORLD FINALS QUALIFIED 2025</span>
<span className="mx-6">///</span>
<span className="mx-6">$ CARGO RUN BENCHMARK --RELEASE</span>
<span className="mx-6">///</span>
<span className="mx-6">WEEKLY DIV_2 MONDAYS 21:00 EST</span>
<span className="mx-6">///</span>
<span className="mx-6">124,891 PROBLEMS EVALUATED ON KERNEL_JUDGE</span>
<span className="mx-6">///</span>
<span className="mx-6">BUILD SPRINT #09 REGISTRATION OPEN</span>
<span className="mx-6">///</span>
<span className="mx-6">â˜… ICPC WORLD FINALS QUALIFIED 2025</span>
<span className="mx-6">///</span>
<span className="mx-6">$ CARGO RUN BENCHMARK --RELEASE</span>
<span className="mx-6">///</span>
<span className="mx-6">WEEKLY DIV_2 MONDAYS 21:00 EST</span>
<span className="mx-6">///</span>
<span className="mx-6">124,891 PROBLEMS EVALUATED ON KERNEL_JUDGE</span>
<span className="mx-6">///</span>
<span className="mx-6">BUILD SPRINT #09 REGISTRATION OPEN</span>
<span className="mx-6">///</span>
</div>
</div>
{/* ========================================================================= */}
{/* 4. UPCOMING CONTESTS & SPRINTS (Editorial Grid with Date Stamps) */}
{/* ========================================================================= */}
<section className="border-b border-outline-variant p-space-md lg:p-space-xl bg-surface-container-high" id="contests">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-4">
<div>
<div className="font-label-mono text-label-mono text-primary-container tracking-wider mb-1">
          [02] // COMPETITIVE SCHEDULE
        </div>
<h2 className="font-headline-lg text-headline-lg font-bold uppercase text-primary">
          Algorithmic Bouts &amp; 48-Hour Systems Sprints
        </h2>
</div>
{/* Segmented Category Filters */}
<div className="flex flex-wrap items-center gap-1 font-label-mono text-label-mono bg-surface-container-low p-1 border border-outline-variant">
<button className="px-3 py-1 bg-primary-container text-surface-container-lowest font-bold">All Events</button>
<button className="px-3 py-1 text-on-surface-variant hover:text-on-surface">Div 1 (2000+)</button>
<button className="px-3 py-1 text-on-surface-variant hover:text-on-surface">Open Sprints</button>
<button className="px-3 py-1 text-on-surface-variant hover:text-on-surface">Workshops</button>
</div>
</div>
{/* 3-Column Contests Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-outline-variant">
{isLoading && <div className="p-4 text-on-surface-variant font-code-md text-code-md">Loading events...</div>}
{!isLoading && dynamicEvents.length === 0 && <div className="p-4 text-on-surface-variant font-code-md text-code-md">No events scheduled.</div>}
{!isLoading && dynamicEvents.slice(0, 3).map(event => (
  <div key={event.id} className="border-r border-b border-outline-variant p-space-md lg:p-space-lg bg-surface-container-low flex flex-col justify-between hover:bg-surface-container transition-none group">
    <div>
      <div className="flex items-center justify-between font-label-mono text-label-mono mb-space-md pb-2 border-b border-outline-variant">
        <span className="text-primary-container font-bold">■ {event.category.toUpperCase()}</span>
        <span className="text-outline">{new Date(event.startsAt).toLocaleDateString()}</span>
      </div>
      {event.isFeatured && (
        <div className="inline-block bg-secondary-container text-primary font-label-mono text-label-mono px-2 py-0.5 font-bold mb-3">
          FEATURED_ALLOCATION
        </div>
      )}
      <h3 className="font-headline-md text-headline-md text-primary font-bold mb-2">
        {event.name.toUpperCase()}
      </h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg leading-relaxed line-clamp-3">
        {event.description}
      </p>
    </div>
    <div className="space-y-3 pt-space-md border-t border-outline-variant font-label-mono text-label-mono">
      <div className="flex justify-between text-xs">
        <span className="text-outline">LOCATION:</span>
        <span className="text-on-surface">{event.venue.toUpperCase()}</span>
      </div>
      {event.capacity && (
        <div className="flex justify-between text-xs">
          <span className="text-outline">CAPACITY:</span>
          <span className="text-on-surface">{event.capacity} NODES MAX</span>
        </div>
      )}
      <Link to="/events" className="w-full bg-primary-container text-surface-container-lowest font-headline-sm text-headline-sm font-bold py-2 hover:bg-white transition-none text-center block mt-2 border border-primary-container hover:-translate-y-px hover:-translate-x-px hard-shadow-citron active:translate-x-0 active:translate-y-0 shadow-none">
        VIEW DETAILS [→]
      </Link>
    </div>
  </div>
))}
</div>
</section>
{/* ========================================================================= */}
{/* 5. ALGORITHMIC HIGHLIGHTS & LEADERBOARD SNIPPET */}
{/* ========================================================================= */}
<section className="border-b border-outline-variant bg-surface-container-high" id="leaderboard">
<div className="grid grid-cols-1 lg:grid-cols-12 border-collapse">
{/* Left Column (5 Cols): Live Solved Hard Challenges Stream */}
<div className="lg:col-span-5 p-space-md lg:p-space-lg border-b lg:border-b-0 lg:border-r border-outline-variant bg-surface-container-high">
<div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-space-md font-label-mono text-label-mono">
<span className="text-primary-container font-bold">// VERIFIED SOLVE STREAM</span>
<span className="text-outline">FEED: WS://JUDGE.LIVE</span>
</div>
<div className="space-y-3">
{/* Submission Row 1 */}
<div className="bg-surface-container-low border border-outline-variant p-3 font-code-md text-code-md">
<div className="flex items-center justify-between mb-1">
<span className="text-primary font-bold">0x_alec</span>
<span className="text-primary-container font-label-mono text-label-mono">[AC / 2400 HARD]</span>
</div>
<div className="text-xs text-on-surface-variant mb-2">Problem: Suffix Automaton Minimal Cover</div>
<div className="flex items-center justify-between text-[11px] font-label-mono text-label-mono text-outline pt-2 border-t border-outline-variant">
<span className="">TAGS: #suffix-automaton #strings</span>
<span className="text-primary-container font-bold">+84 RATING DELTA</span>
</div>
</div>
{/* Submission Row 2 */}
<div className="bg-surface-container-low border border-outline-variant p-3 font-code-md text-code-md">
<div className="flex items-center justify-between mb-1">
<span className="text-primary font-bold">vector_queen</span>
<span className="text-primary-container font-label-mono text-label-mono">[AC / 2600 GRANDMASTER]</span>
</div>
<div className="text-xs text-on-surface-variant mb-2">Problem: Persistent Segment Tree with Fractional Cascading</div>
<div className="flex items-center justify-between text-[11px] font-label-mono text-label-mono text-outline pt-2 border-t border-outline-variant">
<span className="">TAGS: #data-structures #geometry</span>
<span className="text-primary-container font-bold">+112 RATING DELTA</span>
</div>
</div>
{/* Submission Row 3 */}
<div className="bg-surface-container-low border border-outline-variant p-3 font-code-md text-code-md">
<div className="flex items-center justify-between mb-1">
<span className="text-primary font-bold">turing_machine_0</span>
<span className="text-secondary-container font-label-mono text-label-mono">[AC / 2200 DIV_1]</span>
</div>
<div className="text-xs text-on-surface-variant mb-2">Problem: Max-Flow Min-Cost with Negative Cycles</div>
<div className="flex items-center justify-between text-[11px] font-label-mono text-label-mono text-outline pt-2 border-t border-outline-variant">
<span className="">TAGS: #flow-networks #min-cost</span>
<span className="text-primary-container font-bold">+46 RATING DELTA</span>
</div>
</div>
</div>
<div className="mt-space-md p-3 bg-surface-container border border-outline-variant text-xs font-label-mono text-label-mono text-on-surface-variant flex items-center justify-between">
<span className="">JUDGE LATENCY: 0.04ms</span>
<a className="text-primary-container hover:underline" href="#">VIEW FULL RUNTIME TELEMETRY â†’</a>
</div>
</div>
{/* Right Column (7 Cols): Hall of Logic Leaderboard Table */}
<div className="lg:col-span-7 p-space-md lg:p-space-lg">
<div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-space-md font-label-mono text-label-mono">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-primary-container">military_tech</span>
<span className="text-primary font-bold uppercase tracking-wider">HALL OF LOGIC // CAMPUS TOP_TEN</span>
</div>
<span className="text-outline">SEASON 2025.1</span>
</div>
{/* Leaderboard Table */}
<div className="overflow-x-auto -mx-1 px-1">
<table className="w-full min-w-[480px] text-left font-label-mono text-label-mono border-collapse">
<thead>
<tr className="border-b border-outline-variant text-outline uppercase">
<th className="py-2.5 px-3">RANK</th>
<th className="py-2.5 px-3">HANDLE</th>
<th className="py-2.5 px-3">DIVISION</th>
<th className="py-2.5 px-3 text-right">RATING</th>
<th className="py-2.5 px-3 text-right">SOLVED</th>
<th className="py-2.5 px-3 text-center">STREAK</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant font-code-md text-code-md">
<tr className="hover:bg-surface-container-low transition-none">
<td className="py-2.5 px-3 text-primary-container font-bold">01</td>
<td className="py-2.5 px-3 font-bold text-primary flex items-center gap-2">
<span className="">0x_alec</span>
<span className="text-[10px] px-1 bg-surface-container-high text-primary-container border border-outline-variant">ICPC_WORLD</span>
</td>
<td className="py-2.5 px-3 text-on-surface-variant font-label-mono text-xs">GRANDMASTER</td>
<td className="py-2.5 px-3 text-right font-bold text-primary">2,642</td>
<td className="py-2.5 px-3 text-right text-on-surface-variant">412</td>
<td className="py-2.5 px-3 text-center text-primary-container font-bold">14W</td>
</tr>
<tr className="hover:bg-surface-container-low transition-none">
<td className="py-2.5 px-3 text-primary-container font-bold">02</td>
<td className="py-2.5 px-3 font-bold text-primary flex items-center gap-2">
<span className="">vector_queen</span>
<span className="text-[10px] px-1 bg-surface-container-high text-primary-container border border-outline-variant">GIT_VERIFIED</span>
</td>
<td className="py-2.5 px-3 text-on-surface-variant font-label-mono text-xs">GRANDMASTER</td>
<td className="py-2.5 px-3 text-right font-bold text-primary">2,589</td>
<td className="py-2.5 px-3 text-right text-on-surface-variant">388</td>
<td className="py-2.5 px-3 text-center text-primary-container font-bold">09W</td>
</tr>
<tr className="hover:bg-surface-container-low transition-none">
<td className="py-2.5 px-3 text-on-surface-variant">03</td>
<td className="py-2.5 px-3 font-bold text-primary">null_ptr_exception</td>
<td className="py-2.5 px-3 text-on-surface-variant font-label-mono text-xs">MASTER</td>
<td className="py-2.5 px-3 text-right font-bold text-primary">2,410</td>
<td className="py-2.5 px-3 text-right text-on-surface-variant">340</td>
<td className="py-2.5 px-3 text-center text-on-surface-variant font-bold">06W</td>
</tr>
<tr className="hover:bg-surface-container-low transition-none">
<td className="py-2.5 px-3 text-on-surface-variant">04</td>
<td className="py-2.5 px-3 font-bold text-primary">turing_machine_0</td>
<td className="py-2.5 px-3 text-on-surface-variant font-label-mono text-xs">CANDIDATE</td>
<td className="py-2.5 px-3 text-right font-bold text-primary">2,328</td>
<td className="py-2.5 px-3 text-right text-on-surface-variant">294</td>
<td className="py-2.5 px-3 text-center text-on-surface-variant font-bold">04W</td>
</tr>
<tr className="hover:bg-surface-container-low transition-none">
<td className="py-2.5 px-3 text-on-surface-variant">05</td>
<td className="py-2.5 px-3 font-bold text-primary">cargo_clippy</td>
<td className="py-2.5 px-3 text-on-surface-variant font-label-mono text-xs">CANDIDATE</td>
<td className="py-2.5 px-3 text-right font-bold text-primary">2,240</td>
<td className="py-2.5 px-3 text-right text-on-surface-variant">261</td>
<td className="py-2.5 px-3 text-center text-on-surface-variant font-bold">03W</td>
</tr>
</tbody>
</table>
</div>
<div className="mt-4 flex items-center justify-between pt-3 border-t border-outline-variant font-label-mono text-label-mono text-xs">
<span className="text-outline">SHOWING TOP 5 OF 380 COMPETITORS</span>
<a className="text-primary-container font-bold hover:underline" href="#">EXPLORE FULL MATRIX [â†’]</a>
</div>
</div>
</div>
</section>
{/* ========================================================================= */}
{/* 6. PROJECTS & OPEN-SOURCE INCUBATOR */}
{/* ========================================================================= */}
<section className="border-b border-outline-variant p-space-md lg:p-space-xl bg-surface-container-high" id="incubator">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-4">
<div>
<div className="font-label-mono text-label-mono text-primary-container tracking-wider mb-1">
          [03] // SYS_LAB INCUBATOR
        </div>
<h2 className="font-headline-lg text-headline-lg font-bold uppercase text-primary">
          Student Projects Solving Real Engineering Constraints
        </h2>
</div>
<a className="inline-flex items-center gap-2 border border-outline px-4 py-2 font-label-mono text-label-mono text-on-surface hover:border-primary-container hover:text-primary-container transition-none" href="https://github.com" rel="noreferrer" target="_blank">
<span className="">ORG: GITHUB/KERNEL-COLLECTIVE</span>
<span className="material-symbols-outlined text-[16px]">open_in_new</span>
</a>
</div>
{/* 3 Projects Bento Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-outline-variant">
{/* Project A: RUST_KVM */}
<div className="border-r border-b border-outline-variant p-space-md lg:p-space-lg bg-surface-container-low flex flex-col justify-between hover:bg-surface-container transition-none">
<div>
<div className="flex items-center justify-between font-label-mono text-label-mono mb-space-md pb-2 border-b border-outline-variant">
<span className="text-primary-container font-bold">CRATE // SYS_VIRT</span>
<span className="text-outline">14m AGO</span>
</div>
<div className="flex items-center gap-2 mb-2">
<span className="w-2.5 h-2.5 bg-primary-container"></span>
<h3 className="font-headline-md text-headline-md text-primary font-bold">RUST_KVM</h3>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg leading-relaxed">
            Lightweight, microsecond-boot hypervisor written in Rust to execute arbitrary untrusted student competitive code submissions in hardened hardware-isolated environments.
          </p>
</div>
<div className="space-y-3 pt-space-md border-t border-outline-variant font-label-mono text-label-mono">
<div className="flex items-center justify-between text-xs">
<span className="px-2 py-0.5 bg-surface-container border border-outline-variant text-primary">LANG: RUST</span>
<span className="text-primary-container font-bold">â˜… 842 STARS</span>
</div>
<div className="flex justify-between items-center text-xs text-outline">
<span className="">LICENSE: MIT / APACHE 2.0</span>
<a className="text-on-surface hover:text-primary-container underline" href="#">REPO [â†’]</a>
</div>
</div>
</div>
{/* Project B: PULSE_DB */}
<div className="border-r border-b border-outline-variant p-space-md lg:p-space-lg bg-surface-container-low flex flex-col justify-between hover:bg-surface-container transition-none">
<div>
<div className="flex items-center justify-between font-label-mono text-label-mono mb-space-md pb-2 border-b border-outline-variant">
<span className="text-secondary-container font-bold">STORAGE // ENGINE</span>
<span className="text-outline">2h AGO</span>
</div>
<div className="flex items-center gap-2 mb-2">
<span className="w-2.5 h-2.5 bg-secondary-container"></span>
<h3 className="font-headline-md text-headline-md text-primary font-bold">PULSE_DB</h3>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg leading-relaxed">
            An embedded, zero-allocation LSM-Tree key-value store crafted in Zig. Optimized for high-frequency write telemetry streaming from university meteorological sensors.
          </p>
</div>
<div className="space-y-3 pt-space-md border-t border-outline-variant font-label-mono text-label-mono">
<div className="flex items-center justify-between text-xs">
<span className="px-2 py-0.5 bg-surface-container border border-outline-variant text-primary">LANG: ZIG 0.13</span>
<span className="text-primary-container font-bold">â˜… 519 STARS</span>
</div>
<div className="flex justify-between items-center text-xs text-outline">
<span className="">BENCHMARK: 1.2M OPS/SEC</span>
<a className="text-on-surface hover:text-primary-container underline" href="#">REPO [â†’]</a>
</div>
</div>
</div>
{/* Project C: ALGO_DIFF */}
<div className="border-r border-b border-outline-variant p-space-md lg:p-space-lg bg-surface-container-low flex flex-col justify-between hover:bg-surface-container transition-none">
<div>
<div className="flex items-center justify-between font-label-mono text-label-mono mb-space-md pb-2 border-b border-outline-variant">
<span className="text-tertiary-container font-bold">DEVTOOL // VISUAL</span>
<span className="text-outline">1d AGO</span>
</div>
<div className="flex items-center gap-2 mb-2">
<span className="w-2.5 h-2.5 bg-tertiary-container"></span>
<h3 className="font-headline-md text-headline-md text-primary font-bold">ALGO_DIFF</h3>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg leading-relaxed">
            Frame-by-frame memory buffer visualizer and interactive tree-traversal debugger. Translates graph state transitions and matrix traversals directly into interactive SVGs.
          </p>
</div>
<div className="space-y-3 pt-space-md border-t border-outline-variant font-label-mono text-label-mono">
<div className="flex items-center justify-between text-xs">
<span className="px-2 py-0.5 bg-surface-container border border-outline-variant text-primary">LANG: TYPESCRIPT + WASM</span>
<span className="text-primary-container font-bold">â˜… 1,280 STARS</span>
</div>
<div className="flex justify-between items-center text-xs text-outline">
<span className="">STATUS: PROD DEPLOYED</span>
<a className="text-on-surface hover:text-primary-container underline" href="#">DEMO [â†’]</a>
</div>
</div>
</div>
</div>
</section>
{/* ========================================================================= */}
{/* 7. TELEMETRY & COMMUNITY METRICS DASHBOARD */}
{/* ========================================================================= */}
<section className="border-b border-outline-variant bg-surface-container-high" id="telemetry">
<div className="p-space-md lg:p-space-xl border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<div className="font-label-mono text-label-mono text-primary-container tracking-wider mb-1">
          [04] // HARDWARE &amp; JUDGE TELEMETRY
        </div>
<h2 className="font-headline-lg text-headline-lg font-bold uppercase text-primary">
          Campus Cluster Operational State
        </h2>
</div>
<div className="flex items-center gap-4 font-label-mono text-label-mono text-xs">
<span className="flex items-center gap-1.5 text-primary-container">
<span className="w-2 h-2 bg-primary-container animate-ping"></span>
          SOCKET CONNECTED
        </span>
<span className="text-outline">UPTIME: 182D 14H 21M</span>
</div>
</div>
{/* 4-Column Metric Ledger */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-outline-variant divide-y sm:divide-y-0 sm:divide-x divide-outline-variant">
{/* Metric 1 */}
<div className="p-space-md lg:p-space-lg bg-surface-container-low">
<div className="font-label-mono text-label-mono text-outline mb-2">TOTAL_EVALUATIONS</div>
<div className="font-display-xl text-headline-lg lg:text-display-xl font-extrabold text-primary mb-1 tracking-tight">
          18,490
        </div>
<div className="font-label-mono text-label-mono text-primary-container text-xs">
          â†‘ 14% SINCE SPRING BOUT
        </div>
</div>
{/* Metric 2 */}
<div className="p-space-md lg:p-space-lg bg-surface-container-low">
<div className="font-label-mono text-label-mono text-outline mb-2">JUDGE_ACCURACY</div>
<div className="font-display-xl text-headline-lg lg:text-display-xl font-extrabold text-primary mb-1 tracking-tight">
          99.94%
        </div>
<div className="font-label-mono text-label-mono text-outline text-xs">
          ZERO FALSE DETERMINISTIC TLEs
        </div>
</div>
{/* Metric 3 */}
<div className="p-space-md lg:p-space-lg bg-surface-container-low">
<div className="font-label-mono text-label-mono text-outline mb-2">PACKAGES_DEPLOYED</div>
<div className="font-display-xl text-headline-lg lg:text-display-xl font-extrabold text-primary mb-1 tracking-tight">
          42
        </div>
<div className="font-label-mono text-label-mono text-primary-container text-xs">
          12 CRATES ON CRATES.IO
        </div>
</div>
{/* Metric 4 */}
<div className="p-space-md lg:p-space-lg bg-surface-container-low">
<div className="font-label-mono text-label-mono text-outline mb-2">REGIONAL_TROPHIES</div>
<div className="font-display-xl text-headline-lg lg:text-display-xl font-extrabold text-primary mb-1 tracking-tight">
          06
        </div>
<div className="font-label-mono text-label-mono text-secondary-container text-xs">
          2x NORTH AMERICAN INVITATIONAL
        </div>
</div>
</div>
{/* Minimal ASCII / SVG Velocity Graph Panel */}
<div className="p-space-md lg:p-space-lg font-label-mono text-label-mono bg-surface-container-high">
<div className="flex items-center justify-between text-xs text-outline mb-3">
<span className="">WEEKLY COMMIT &amp; EVALUATION VELOCITY [30 DAYS ROLLING]</span>
<span className="text-primary-container font-mono">PEAK: 1,420 RUNS/HR</span>
</div>
{/* Scaled Raw SVG Histogram Bar Graph */}
<div className="h-28 w-full border border-outline-variant bg-surface-container-low p-2 flex items-end gap-1 overflow-hidden">
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[20%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[35%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[40%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[25%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[50%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[65%]"></div>
<div className="flex-1 bg-primary-container h-[92%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[70%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[55%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[45%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[80%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[60%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[95%]"></div>
<div className="flex-1 bg-secondary-container h-[100%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[85%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[75%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[90%]"></div>
<div className="flex-1 bg-primary-container h-[88%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[60%]"></div>
<div className="flex-1 bg-surface-container-high hover:bg-primary-container transition-none h-[70%]"></div>
</div>
<div className="flex flex-wrap justify-between text-[10px] text-outline mt-1.5 font-label-mono gap-x-2 gap-y-1">
<span className="">T - 30 DAYS</span>
<span className="">MID-TERM REFACTOR</span>
<span className="">ICPC REGIONAL QUALIFIERS</span>
<span className="">CURRENT DISPATCH (ONLINE)</span>
</div>
</div>
</section>
{/* ========================================================================= */}
{/* 8. INTERACTIVE MEMBERSHIP CLI & MANIFESTO CTA */}
{/* ========================================================================= */}
<section className="border-b border-outline-variant p-space-md lg:p-space-xl bg-surface-container-high" id="cli-section">
<div className="max-w-4xl mx-auto">
<div className="text-center mb-space-lg">
<span className="font-label-mono text-label-mono text-primary-container tracking-widest px-2 py-0.5 border border-outline-variant bg-surface-container">
          // JOIN PROTOCOL: FELLOWSHIP 2025
        </span>
<h2 className="font-headline-lg text-headline-lg font-bold uppercase text-primary mt-3">
          Deploy Your Skills to the Chapter
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mt-2">
          Admission is determined through blind algorithmic sparring and code contribution audits. Zero social pedigree required.
        </p>
</div>
{/* Terminal Box Prompt */}
<div className="border border-outline-variant bg-surface-container-lowest p-space-md font-code-md text-code-md">
<div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-space-md">
<div className="flex items-center gap-2">
<span className="w-3 h-3 bg-secondary-container"></span>
<span className="w-3 h-3 bg-surface-variant"></span>
<span className="w-3 h-3 bg-primary-container"></span>
<span className="font-label-mono text-label-mono text-outline ml-2">guest@campus-node-login:~</span>
</div>
<span className="font-label-mono text-label-mono text-xs text-primary-container">UNIX SOCKET OK</span>
</div>
<div className="space-y-2 mb-space-md text-on-surface">
<div><span className="text-outline"># Run automated onboarding script via terminal:</span></div>
<div className="flex items-center gap-2 text-primary font-bold bg-surface-container-high p-3 border border-outline-variant overflow-x-auto">
<span className="text-primary-container select-none">â¯</span>
<span className="text-on-surface" id="curl-cmd">curl -sSL https://kernel.dev/join | bash</span>
<button className="ml-auto bg-primary-container text-surface-container-lowest font-label-mono text-xs px-2.5 py-1 font-bold hover:bg-white transition-none whitespace-nowrap" onClick={() => { copyCliCmd() }}>
              COPY COMMAND
            </button>
</div>
</div>
<div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-3 border-t border-outline-variant font-label-mono text-label-mono">
<div className="text-xs text-on-surface-variant">
            REQUIREMENTS: GCC 12+, RUSTC 1.78+, OR CLANG // GPG SIGNED KEYS
          </div>
<div className="flex items-center gap-3 w-full sm:w-auto">
<a className="flex-1 sm:flex-initial text-center border border-outline px-3 py-2 text-on-surface hover:text-primary-container hover:border-primary-container transition-none" href="https://discord.com" rel="noreferrer" target="_blank">
              JOIN DISCORD_SOCKET
            </a>
<button className="flex-1 sm:flex-initial bg-primary-container text-surface-container-lowest px-4 py-2 font-bold hover:bg-white transition-none" onClick={() => { alert('Applications open for Sprint Cohort 2025.1. Solve problem #842 above to qualify automatically.'); }}>
              SUBMIT APPLICATION [âŒ˜B]
            </button>
</div>
</div>
</div>
</div>
</section>
{/* ========================================================================= */}
{/* 9. SHARED COMPONENT: Footer (Exact mapping from JSON & Style Specs) */}
{/* ========================================================================= */}

{/* ========================================================================= */}
{/* Micro-Interactions Script */}
{/* ========================================================================= */}



    </>
  );
}
