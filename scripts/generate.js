// Daily plant care article generator
const fs=require('fs'),path=require('path');
const today=new Date().toISOString().slice(0,10),slug=today;
const feedPath=path.join(__dirname,'..','feed.json');
const feed=JSON.parse(fs.readFileSync(feedPath,'utf8'));
if(feed.posts.find(p=>p.slug===slug)){console.log('Already exists');process.exit(0)}

const pool=[
[{title:'绿萝叶子发黄的6种原因和补救方法',desc:'浇水太多烂根、光照太强灼伤、缺肥营养不良、温度太低冻伤。对症下药才能救回来。',tag:'绿萝'},
{title:'多肉植物浇水全攻略：什么时候浇、浇多少',desc:'干透浇透是基本原则。叶片发皱再浇水。夏天休眠期要断水，冬天少量给水。',tag:'多肉'},
{title:'新手养花入门：最好养的10种室内绿植',desc:'绿萝、虎皮兰、吊兰、龟背竹、富贵竹……怎么折腾都不死的懒人植物推荐。',tag:'新手入门'},
{title:'发财树掉叶子怎么办？常见原因和处理',desc:'发财树怕冷、怕涝、怕闷。冬天少浇水、远离空调风口、散射光养护。',tag:'常见问题'},
{title:'盆栽土壤板结怎么办？松土和换盆技巧',desc:'长期用自来水浇花会导致土壤盐碱化板结。用浸盆法浇水+每年换一次土。',tag:'养护技巧'}],

[{title:'兰花怎么养？春兰建兰墨兰养护要点',desc:'兰花喜阴怕晒，需要疏松透气的植料。浇水要见干见湿，空气湿度保持60%以上。',tag:'兰花'},
{title:'多肉徒长了怎么办？控水+补光+砍头',desc:'徒长是因为光照不足。移到阳光充足处，控水让新叶紧凑。严重徒长可以砍头重栽。',tag:'多肉'},
{title:'绿萝怎么扦插繁殖？水培和土培两种方法',desc:'剪一段带气生根的茎节，水培一周就能生根。土培用蛭石或营养土，保持湿润。',tag:'绿萝'},
{title:'花盆底部要不要垫东西？陶粒和碎瓦片的作用',desc:'垫一层排水层能防止积水烂根。陶粒、碎瓦片、泡沫块都可以。不要用石子太重。',tag:'养护技巧'},
{title:'富贵竹叶子发黄？可能是水质和光照问题',desc:'最好用晾过的自来水或纯净水。不要阳光直射。水里放一颗铁钉可以补铁防黄叶。',tag:'常见问题'}],

[{title:'绿萝怎么施肥？用什么肥料好',desc:'春秋生长季每半月施一次稀薄液肥。氮肥为主促进叶片长大。冬天停止施肥。',tag:'绿萝'},
{title:'多肉度夏攻略：黑腐和水化的预防',desc:'夏天是多肉的鬼门关。通风第一、断水第二、遮阳第三。发现黑腐立即砍头。',tag:'多肉'},
{title:'盆栽长虫了怎么办？常见害虫和防治方法',desc:'蚜虫用洗洁精水喷、红蜘蛛增加湿度、介壳虫用酒精擦。严重时用吡虫啉。',tag:'病虫害'},
{title:'吊兰叶尖干枯发黑？原因和解决方法',desc:'空气太干燥、浇水不均匀、施肥过多烧根都可能导致。剪掉枯尖+增加喷雾。',tag:'常见问题'},
{title:'龟背竹怎么养才能开背？光照和湿度是关键',desc:'小苗叶子没有开裂是正常的。给散射光+保持高湿度，2-3年后新叶开始开背。',tag:'养护技巧'}],

[{title:'多肉叶插繁殖教程：一片叶子变一盆',desc:'掰下健康叶片，晾2-3天伤口愈合后平放在潮土上。2周开始出根出芽。不要埋土里。',tag:'多肉'},
{title:'虎皮兰的养护：最耐阴最耐旱的懒人植物',desc:'一个月不浇水都行。散射光或阴暗角落都能活。冬天低于10度要搬进室内。',tag:'养护技巧'},
{title:'盆栽什么时候该换盆？3个信号告诉你',desc:'根从盆底钻出来、浇水很快流走、植物停止生长。换盆选春秋季，大一号的盆。',tag:'养护技巧'},
{title:'绿萝叶子越来越小？可能是缺光或营养不良',desc:'长期放在阴暗处，新叶会变小、节间变长。移到明亮散射光处+补充液肥改善。',tag:'绿萝'},
{title:'水培植物怎么养？营养液和换水频率',desc:'自来水晾一天再用。每周换一次水。营养液要稀释到说明书的一半浓度避免烧根。',tag:'养护技巧'}],

[{title:'发财树养护全攻略：光照浇水施肥修剪',desc:'散射光养护、盆土干了再浇、每月一次复合肥、春天剪掉徒长枝保持株型。',tag:'养护技巧'},
{title:'多肉褪色了怎么恢复？上色三要素',desc:'多肉上色需要：大温差（10度以上）、充足光照、适当控水。秋冬是最美的时候。',tag:'多肉'},
{title:'盆栽叶子卷曲发皱？可能是这几个原因',desc:'缺水导致萎蔫、肥害烧根、虫害吸食汁液、晒伤脱水。观察叶片背面有没有虫。',tag:'常见问题'},
{title:'蟹爪兰怎么养才能开花？短日照催花法',desc:'10月开始每天只给8-10小时光照，其余时间遮黑。同时控水、施磷钾肥促花。',tag:'花期管理'},
{title:'养花用得着的实用小工具推荐',desc:'土壤湿度计、电动喷壶、补光灯、自动浇水器。几十块钱让养花省心很多。',tag:'实用推荐'}],

[{title:'绿萝养护最容易犯的5个错误',desc:'浇水太频繁、放在暗无天日的角落、冬天继续施肥、从不擦叶子、一个盆种太密。',tag:'绿萝'},
{title:'多肉组合盆栽怎么搭配好看？',desc:'同科属的种一起方便管理。高低错落、颜色搭配、留出生长空间。铺面石用麦饭石。',tag:'多肉'},
{title:'盆栽白粉病的识别和防治',desc:'叶子表面一层白色粉末，多发生在通风不好的封闭阳台。小苏打水喷+增加通风。',tag:'病虫害'},
{title:'文竹叶子发黄脱落？湿度是关键',desc:'文竹最怕干燥。每天喷雾增加湿度，远离暖气空调。黄叶剪掉还能长新的。',tag:'常见问题'},
{title:'冬天养花注意事项：温度浇水和光照',desc:'大多数室内绿植低于10度生长停滞。减少浇水频率，停止施肥，远离冷风口。',tag:'养护技巧'}],

[{title:'绿萝长得太长怎么修剪和造型',desc:'太长的藤蔓可以剪下来扦插。想让绿萝爬墙可以用无痕挂钩引导。做绿萝柱更壮观。',tag:'绿萝'},
{title:'多肉常见品种图鉴：新手推荐Top10',desc:'胧月、姬胧月、冬美人、吉娃娃、桃蛋、熊童子、玉露、生石花、黑王子、虹之玉。',tag:'多肉'},
{title:'植物烂根怎么急救？修剪消毒换土三步走',desc:'脱盆→剪掉所有腐烂根系→多菌灵浸泡消毒→换新土重新上盆→放在阴凉处缓苗。',tag:'紧急处理'},
{title:'适合放在卧室的绿植：净化空气还好养',desc:'虎皮兰夜间释放氧气、芦荟净化甲醛、常春藤吸苯。注意卧室不要放太多盆。',tag:'实用推荐'},
{title:'花肥怎么选？氮磷钾的作用和用法',desc:'氮长叶、磷促花、钾壮根。观叶植物多用氮肥，开花植物在花前改施磷钾肥。',tag:'养护技巧'}],

[{title:'绿萝黄叶和枯叶有什么区别？不同处理方式',desc:'老叶自然发黄脱落是正常的。新叶发黄是缺素。叶尖干枯是湿度不够或肥害。',tag:'绿萝'},
{title:'多肉黑腐病：一夜之间整棵化水',desc:'细菌感染导致，传播极快。发现黑腐立即砍到健康组织，伤口涂多菌灵。工具要消毒。',tag:'病虫害'},
{title:'盆栽使用什么土最好？通用营养土配方',desc:'泥炭土:珍珠岩:蛭石=3:1:1通用配方。多肉要用颗粒土（泥炭:颗粒=3:7）。',tag:'养护技巧'},
{title:'适合新手的开花植物推荐：好养又好看',desc:'长寿花、蟹爪兰、蝴蝶兰、天竺葵、长春花。花期长、管理简单、价格不贵。',tag:'新手入门'},
{title:'阳台养花怎么布置？不同朝向适合什么植物',desc:'南阳台选喜光植物、北阳台选耐阴植物。利用花架和吊盆增加空间利用率。',tag:'实用推荐'}],
];

const idx=(new Date().getDate()-1)%pool.length;
const items=pool[idx];
const titles=[`今日盆栽养护 | ${items[0].tag}`, `养花必看：${items[0].title.substring(0,15)}…`, `盆栽知识 | ${today}`, `花友必读 | ${items[0].tag}专题`];
const postTitle=titles[new Date().getDate()%titles.length];

feed.posts.unshift({slug,date:today,title:postTitle,items});
feed.updated=today;fs.writeFileSync(feedPath,JSON.stringify(feed,null,2));

const html=`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${postTitle} - 盆栽养护指南</title><meta name="description" content="${items.map(i=>i.title).join('、')}"><style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}:root{--bg:#fafafa;--card:#fff;--text:#1a1a2e;--t2:#666;--accent:#16a34a;--border:#e5e7eb;--r:10px}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans SC",sans-serif;background:var(--bg);color:var(--text);line-height:1.7;min-height:100vh}.container{max-width:800px;margin:0 auto;padding:0 20px}header{background:var(--card);border-bottom:1px solid var(--border);padding:20px 0;margin-bottom:32px}header a{color:var(--accent);text-decoration:none;font-size:.9rem}header h1{font-size:1.3rem;margin-top:8px}.post{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:28px}.post .date{color:var(--t2);font-size:.8rem;margin-bottom:20px}.entry{margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--border)}.entry:last-child{border-bottom:none}.entry h3{font-size:1rem;margin-bottom:4px}.entry p{color:var(--t2);font-size:.9rem}.tag{display:inline-block;background:#f0fdf4;color:var(--accent);font-size:.72rem;padding:2px 8px;border-radius:10px;margin-left:6px}footer{text-align:center;padding:32px 20px;color:var(--t2);font-size:.8rem}@media(max-width:600px){.post{padding:18px}}</style></head><body><header><div class="container"><a href="../index.html">← 盆栽养护首页</a><h1>${postTitle}</h1></div></header><main class="container"><article class="post"><div class="date">📅 ${today}</div>${items.map(i=>`<div class="entry"><h3>${i.title} <span class="tag">${i.tag}</span></h3><p>${i.desc}</p></div>`).join('')}</article></main><footer><p>盆栽养护指南 · 每日更新</p></footer></body></html>`;
fs.writeFileSync(path.join(__dirname,'..','posts',`${slug}.html`),html);
console.log('Generated:',postTitle);
