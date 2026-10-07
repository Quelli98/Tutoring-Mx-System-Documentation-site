from pathlib import Path
from html import escape
O=Path(__file__).resolve().parents[1]/'public/diagrams'
O.mkdir(parents=True,exist_ok=True)
NAVY='#142f50'; BLUE='#2160cc'; TEAL='#147d73'; INK='#243c54'; MUTED='#577086'; LINE='#bdccda'; LIGHT='#f3f7fb'; PLAN='#eaf6f3'
class SVG:
 def __init__(self,title,scope,h=850):
  self.h=h;self.a=[f'<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="{h}" viewBox="0 0 1100 {h}" role="img" aria-label="{escape(title)}"><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10" fill="none" stroke="{MUTED}" stroke-width="1.5"/></marker><marker id="triangle" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="10" markerHeight="10" orient="auto"><path d="M1 1 L11 6 L1 11 Z" fill="white" stroke="{MUTED}"/></marker></defs><rect width="1100" height="{h}" fill="white"/><rect width="1100" height="10" fill="{NAVY}"/>']
  self.t(40,52,title,27,NAVY,700);self.t(40,81,scope,14,MUTED); self.a.append('<style>text{font-family:Arial,Helvetica,sans-serif} .edge{fill:none;stroke:#577086;stroke-width:1.7;stroke-linejoin:round}</style>')
 def t(self,x,y,s,size=16,c=INK,w=400,anchor='start'):
  self.a.append(f'<text x="{x}" y="{y}" font-size="{size}" fill="{c}" font-weight="{w}" text-anchor="{anchor}">{escape(s)}</text>')
 def lines(self,x,y,ss,size=15,c=MUTED,gap=23,anchor='start'):
  for i,s in enumerate(ss):self.t(x,y+i*gap,s,size,c,anchor=anchor)
 def rect(self,x,y,w,h,fill=LIGHT,stroke=LINE,dash=False,rx=9):
  self.a.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="1.5"'+(' stroke-dasharray="7 5"' if dash else '')+'/>')
 def box(self,x,y,w,h,title,body=(),kind='',plan=False):
  self.rect(x,y,w,h,PLAN if plan else LIGHT,TEAL if plan else LINE,plan)
  yy=y+27
  if kind:self.t(x+16,yy,kind,12,TEAL if plan else BLUE,700);yy+=25
  self.t(x+16,yy,title,18,NAVY,700);self.lines(x+16,yy+27,body,14)
 def path(self,points,label='',lx=None,ly=None,dash=False,arrow=True,tri=False):
  d=' '.join(('M' if i==0 else 'L')+str(x)+' '+str(y) for i,(x,y) in enumerate(points))
  self.a.append(f'<path d="{d}" class="edge"'+(' stroke-dasharray="7 5"' if dash else '')+(f' marker-end="url(#{"triangle" if tri else "arrow"})"' if arrow else '')+'/>')
  if label:self.t(lx if lx is not None else points[0][0]+9,ly if ly is not None else points[0][1]-9,label,13,MUTED,500)
 def circle(self,x,y,r=8,fill=NAVY):self.a.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{NAVY}" stroke-width="2"/>')
 def ellipse(self,x,y,rx,ry,label,plan=False):
  self.a.append(f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{PLAN if plan else LIGHT}" stroke="{TEAL if plan else LINE}" stroke-width="1.5"'+(' stroke-dasharray="7 5"' if plan else '')+'/>');self.lines(x,y-((len(label)-1)*11)+5,label,15,INK,22,'middle')
 def actor(self,x,y,label):
  self.circle(x,y,12,'white');self.path([(x,y+12),(x,y+51)],arrow=False);self.path([(x-23,y+27),(x+23,y+27)],arrow=False);self.path([(x-22,y+76),(x,y+51),(x+22,y+76)],arrow=False);self.t(x,y+100,label,16,NAVY,700,'middle')
 def finish(self,name,foot='Source: 30 Sep handbook + final Sprint 4 main supplied 7 Oct 2026.'):
  self.t(40,self.h-23,foot,12,MUTED);self.a.append('</svg>');(O/f'{name}.svg').write_text(''.join(self.a))

s=SVG('Component diagram','Final Sprint 4 components and their dependencies. All boxes shown are implemented in the supplied final source.',880)
s.box(40,130,305,160,'React frontend',['Role workspaces and calendars','Shared bearer API client','Current Master approval queue'],'«component»')
s.box(405,130,295,160,'Express API',['Authentication + profile/role guards','Routes → domain services','Safe HTTP response contract'],'«component»')
s.box(760,130,300,160,'Auth0',['SPA authentication / access tokens','JWKS token verification','Server-only Management API'],'«external component»')
s.box(405,380,295,125,'Prisma + pg',['Queries, constraints, transactions'],'«component»')
s.box(405,600,295,125,'Neon PostgreSQL',['30 models / 30 source migrations'],'«database»')
s.box(40,380,305,215,'Shared scheduling extension',['Reuse TimeSlot + recurrence','M1 Student timetable ownership','M2 mutual availability','M3 booking / M4 Student sickness'],'«component»',False)
s.box(760,380,300,145,'Nager.Date adapter',['Validated ZA holiday results','Timeout, cache and fallback'],'«component»')
s.box(760,610,300,150,'Advanced planning extensions',['M2 scenarios / M3 swaps','M5 audit / M6 draft proposals'],'«component»',False)
s.path([(345,208),(405,208)],'HTTPS',350,193,True);s.path([(700,220),(760,220)],'auth',711,202,True)
s.path([(193,130),(193,107),(910,107),(910,130)],'Universal Login',450,100,True)
s.path([(552,290),(552,380)],'uses',565,340,True);s.path([(552,505),(552,600)],'SQL / TLS',568,552,True)
s.path([(345,458),(405,458)],dash=True);s.path([(700,275),(715,275),(715,435),(760,435)],dash=True)
s.path([(405,258),(365,258),(365,405),(345,405)],dash=True)
s.path([(610,290),(610,320),(724,320),(724,685),(760,685)],dash=True)
s.lines(40,680,['Browser code never connects','directly to Neon or Prisma.','Master is an extra Organiser','capability, not a fourth workspace.'],16,INK,25)
s.finish('component')

s=SVG('Deployment diagram','Current hosting topology. The browser executes the frontend; Render executes the backend.',925)
def node(x,y,w,h,title,body,kind):
 s.path([(x,y),(x+12,y-12),(x+w+12,y-12),(x+w+12,y+h-12),(x+w,y+h)],arrow=False)
 s.rect(x,y,w,h,'#f7f9fc',LINE,rx=0);s.path([(x+w,y),(x+w+12,y-12)],arrow=False);s.t(x+18,y+27,kind,12,BLUE,700);s.t(x+18,y+56,title,19,NAVY,700);s.lines(x+18,y+86,body,14)
node(55,145,300,185,'User device / browser',['«artifact» React/Vite application','Auth0 client + API helper','Own user session'],'«device»')
node(690,145,350,185,'Cloudflare Pages',['«artifact» frontend/dist','Public VITE_* build configuration','tutor-mx.pages.dev'],'«execution environment»')
node(55,425,390,185,'Render Node runtime',['«artifact» Express compiled backend','JWT + role/ownership checks','Prisma/pg + server-only secrets'],'«execution environment»')
node(690,425,350,155,'Auth0 tenant',['Universal Login / JWKS','Role claims + Management API'],'«external environment»')
node(55,730,390,115,'Neon PostgreSQL',['«artifact» schema + migrated records'],'«database environment»')
node(690,730,350,115,'Nager.Date',['«service» public holidays'],'«external environment»')
s.path([(690,227),(355,227)],'HTTPS static assets',465,207)
s.path([(205,330),(205,425)],'HTTPS + bearer / JSON',220,380)
s.path([(355,290),(550,290),(550,485),(690,485)],'OIDC sign-in',430,275)
s.path([(445,530),(690,530)],'HTTPS: JWKS / Management',465,515)
s.path([(250,610),(250,730)],'SQL over TLS',265,680)
s.path([(445,570),(575,570),(575,785),(690,785)],'HTTPS',585,770)
s.finish('deployment','Documentation itself is a separate GitHub Pages deployment. Managed-provider hardware is intentionally abstracted.')

s=SVG('Composite structure diagram','Target shared-scheduling component: ports and internal parts. Existing recurrence infrastructure is reused.',865)
s.rect(60,135,980,615,'white',TEAL,False,0);s.t(85,170,'«structured component» SharedScheduling : final Sprint 4',21,NAVY,700)
for x,y,label,ly in [(53,238,'availability request',208),(53,500,'booking command',448),(1033,335,'persistence',390),(1033,628,'calendar projection',666)]:
 s.rect(x,y,14,24,'white',TEAL,False,0);s.t(x-5 if x>1000 else x+28,ly,label,13,TEAL,600,'end' if x>1000 else 'start')
s.box(115,220,250,125,'guards : access',['Verified identity + own schedule','Role-safe returned fields'],'«part»')
s.box(440,220,250,125,'busy : intervals',['TimeSlot recurrence / terms','Exceptions + sessions'],'«part»')
s.box(760,220,235,125,'gaps : intersection',['Student free ∩ Tutor free','Duration + bounded window'],'«part»',False)
s.box(115,465,250,150,'booking : coordinator',['Recheck current free time','Version / duplicate conflict','Confirm or cancel safely'],'«part»',False)
s.box(440,465,250,150,'store : repository',['Existing TimeSlot + Allocation','New TutoringBooking','Transaction boundary'],'«part»',False)
s.box(760,465,235,150,'views : projections',['Same booking on both','Student / Tutor calendars','No private labels leaked'],'«part»',False)
s.path([(67,250),(115,250)]);s.path([(365,283),(440,283)]);s.path([(690,283),(760,283)])
s.path([(67,512),(115,512)]);s.path([(365,540),(440,540)])
s.path([(300,465),(300,390),(495,390),(495,345)],'recheck',325,382)
s.path([(690,540),(760,540)]);s.path([(995,540),(1015,540),(1015,640),(1033,640)])
s.path([(690,578),(720,578),(720,365),(1015,365),(1015,347),(1033,347)])
s.lines(95,695,['Square ports are boundary interfaces. Connectors show collaboration between named internal parts.','No StudentTimeSlot table, second recurrence engine or browser-side availability calculation.'],15,INK,24)
s.finish('composite')

s=SVG('Use case diagram','Final Sprint 4 use cases. Master specialises Organiser; Student scheduling and advanced planning are implemented.',1045)
s.rect(230,130,635,820,'white',LINE,False,0);s.t(250,164,'Tutor MX system boundary',19,NAVY,700)
s.actor(105,205,'Student');s.actor(105,540,'Tutor');s.actor(965,210,'Organiser');s.actor(965,655,'Master Organiser')
s.ellipse(440,245,175,49,['View / volunteer for','eligible overflow'])
s.ellipse(440,383,175,62,['Maintain own timetable,','book mutual tutoring times,','request Student sick note'],False)
s.ellipse(440,565,175,62,['Manage Tutor timetable,','work logs / timesheets,','Tutor excuse'])
s.ellipse(440,748,175,48,['Request / respond','to Tutor swap'],False)
s.ellipse(730,240,106,52,['Manage staffing,','reports / approvals'])
s.ellipse(730,535,106,68,['Plan scenarios,','audit / restore,','review proposals'],False)
s.ellipse(730,813,108,55,['Review lecturer','applications'])
s.path([(125,250),(265,245)],arrow=False);s.path([(125,275),(250,383),(265,383)],arrow=False)
s.path([(125,585),(265,565)],arrow=False);s.path([(125,610),(225,748),(265,748)],arrow=False)
s.path([(945,250),(836,240)],arrow=False);s.path([(945,286),(900,535),(836,535)],arrow=False)
s.path([(945,700),(895,813),(838,813)],arrow=False);s.path([(965,640),(965,326)],'inherits',982,470,tri=True)
s.lines(265,895,['Auth0 supports sign-in for all actors (external identity service).','Private timetable labels are not part of mutual-availability results.'],14,MUTED,23)
s.finish('use-case')

s=SVG('Activity diagram','Final Sprint 4 booking flow: server rechecks a mutual free slot before one confirmed booking is committed.',1120)
s.circle(390,131);s.box(220,167,340,72,'Choose Tutor, course and duration');s.path([(390,139),(390,167)])
s.box(220,279,340,90,'Read mutual availability',['Use both schedules, sessions and terms']);s.path([(390,239),(390,279)])
s.box(220,410,340,72,'Select time and confirm');s.path([(390,369),(390,410)])
s.box(220,523,340,85,'Authenticate + validate + recheck',['Server write transaction, fresh busy time']);s.path([(390,482),(390,523)])
s.a.append('<path d="M390 647 L493 698 L390 749 L287 698 Z" fill="#edf4ff" stroke="#2160cc" stroke-width="1.5"/>');s.t(390,703,'Still allowed & free?',15,NAVY,600,'middle');s.path([(390,608),(390,647)])
s.box(713,657,300,92,'Return safe failure / conflict',['Explain, reload and choose again']);s.path([(493,698),(713,698)],'[no]',565,682)
s.path([(863,657),(863,324),(560,324)])
s.box(220,796,340,72,'Commit one confirmed booking');s.path([(390,749),(390,796)],'[yes]',405,776)
s.a.append(f'<rect x="225" y="906" width="570" height="7" fill="{NAVY}"/>');s.path([(390,868),(390,906)])
s.box(80,951,320,67,'Refresh both calendar projections');s.box(590,951,320,67,'Emit de-duplicated notifications')
s.path([(240,913),(240,951)]);s.path([(750,913),(750,951)])
s.a.append(f'<rect x="225" y="1041" width="570" height="7" fill="{NAVY}"/>');s.path([(240,1018),(240,1041)]);s.path([(750,1018),(750,1041)])
s.circle(510,1070,10,'white');s.circle(510,1070,6);s.path([(510,1048),(510,1060)])
s.finish('activity','Final source + handbook pp. 32–38. A displayed free slot is still rechecked transactionally before confirmation.')

s=SVG('State machine diagram','Current OrganiserApplication lifecycle. Account/profile effects accompany transitions; the record is retained.',780)
s.circle(550,138);s.box(375,186,350,108,'PENDING',['Verified lecturer registration','No new Organiser Profile or role']);s.path([(550,146),(550,186)],'register',567,170)
s.box(80,472,380,145,'REJECTED',['Master rejects a pending application','Optional review note / reviewer / time','No applicant Profile created'])
s.box(640,472,380,145,'APPROVED',['Master approves pending application','Auth0 ORGANISER grant','Neon Profile + review metadata'])
s.path([(420,294),(270,377),(270,472)],'reject [Master, pending]',85,356)
s.path([(680,294),(830,377),(830,472)],'approve [Master, pending]',850,415)
s.path([(375,236),(240,236),(240,162),(415,162),(415,186)],'repeat registration / same record',73,133)
s.lines(130,685,['A second decision on a reviewed application is rejected as a conflict (409).','The source does not define automatic resubmission or reopening of REJECTED applications.'],16,INK,27)
s.finish('state-machine','Auth0 provisioning precedes the Neon transaction. Cross-provider failure requires reconciliation; it is not atomic.')

s=SVG('Sequence diagram','Current Master approval happy path. Five participants; time flows downward. Dashed lines are responses.',1050)
xs=[110,320,535,750,970];names=[['Master browser'],['Express + guards'],['Auth0 Management'],['Prisma / Neon'],['Lecturer browser']]
for x,n in zip(xs,names):
 s.rect(x-94,128,188,62,LIGHT,LINE);s.lines(x,164,n,16,NAVY,22,'middle');s.path([(x,190),(x,955)],dash=True,arrow=False)
def msg(a,b,y,label,ret=False):
 s.path([(xs[a],y),(xs[b],y)],dash=ret);s.t((xs[a]+xs[b])/2,y-11,label,13,INK,500,'middle')
msg(0,1,240,'POST approve + bearer')
s.box(365,268,325,60,'Verify Organiser + Master claim')
msg(1,3,372,'Read reviewer + PENDING application');msg(3,1,416,'Identity and pending record',True)
msg(1,2,489,'Provision ORGANISER role');msg(2,1,538,'Verified identity / matching email',True)
s.rect(685,585,250,165,'#eef6ff',BLUE);s.t(701,614,'Neon transaction',16,BLUE,700);s.lines(701,642,['Claim only if still PENDING','Create / link Organiser Profile','Record reviewer and time'],14,INK,25)
msg(1,3,578,'Begin checked database update');msg(3,1,781,'Committed application',True);msg(1,0,831,'200 data.application',True)
msg(4,1,915,'Later: fresh token → GET /api/me');msg(1,4,957,'Approved profile → Organiser UI',True)
s.finish('sequence','Failures omitted from the happy path: 401/403, unavailable provider, stale 409, or database failure after Auth0 grant.')

s=SVG('Timing diagram','Final Sprint 4 Student sickness workflow. Discrete event order only; not elapsed-time measurements.',785)
left=242;cols=[left,left+155,left+310,left+465,left+620]
for x,label in zip(cols,['t0 Confirm','t1 Submit sick','t2 Pending','t3 Approve','t4 Refresh']):
 s.t(x,145,label,14,NAVY,600,'middle');s.path([(x,165),(x,650)],dash=True,arrow=False)
for y,label in [(220,'Booking'),(395,'Sick note'),(565,'Busy interval')]:s.t(35,y,label,18,NAVY,700)
# Digital state traces, same transition time at t3 for approval release.
def seg(x1,x2,y,c=BLUE):s.a.append(f'<path d="M{x1} {y} H{x2}" fill="none" stroke="{c}" stroke-width="3"/>')
seg(cols[0],cols[3],245);s.path([(cols[3],245),(cols[3],300)],arrow=False);seg(cols[3],cols[4]+100,300,TEAL)
s.t(cols[0]+20,230,'CONFIRMED',15,BLUE,600);s.t(cols[3]+20,285,'EXCUSED',15,TEAL,600)
seg(cols[0],cols[1],450,MUTED);s.path([(cols[1],450),(cols[1],395)],arrow=False);seg(cols[1],cols[3],395);s.path([(cols[3],395),(cols[3],450)],arrow=False);seg(cols[3],cols[4]+100,450,TEAL)
s.t(cols[0]+17,477,'none',14,MUTED);s.t(cols[1]+15,380,'PENDING',15,BLUE,600);s.t(cols[3]+18,477,'APPROVED',15,TEAL,600)
seg(cols[0],cols[3],570);s.path([(cols[3],570),(cols[3],625)],arrow=False);seg(cols[3],cols[4]+100,625,TEAL)
s.t(cols[0]+20,555,'BLOCKED for both people',15,BLUE,600);s.t(cols[3]+20,610,'RELEASED',15,TEAL,600)
s.lines(40,702,['Advance approval marks the booking Excused and releases active busy time. Rejection leaves it scheduled.','Approval at/after the start is retained as Skipped history; the booking is not silently deleted.'],15,INK,25)
s.finish('timing')

s=SVG('Database relationship map','Final Sprint 4 relationship overview. Arrows follow important foreign-key relationships; the public dictionary covers all 30 models.',1120)
for x,y,w,h,t,b in [
 (420,120,260,105,'Profile',['Auth0 identity / stored role','Student, Tutor or Organiser']),
 (50,290,270,90,'OrganiserApplication',['reviewerProfileId → Profile']),
 (355,290,270,100,'TimeSlot',['profile owner → Profile','termId → AcademicTerm']),
 (680,290,270,100,'Allocation',['tutorId → Profile','courseId → Course']),
 (50,485,270,105,'Scenario / ScenarioItem',['createdBy / updatedBy → Profile','draft staffing + locks']),
 (355,485,270,105,'TutoringBooking',['studentId / tutorId → Profile','courseId → Course']),
 (680,485,270,105,'TutorSwap / SwapEvent',['allocation + Tutor actors','preserved decision history']),
 (50,700,270,105,'StudentSickNote',['bookingId → TutoringBooking','reviewedById → Profile']),
 (355,700,270,105,'AuditEvent',['actorId → Profile','redacted target snapshots']),
 (680,700,270,105,'Timesheet / WorkLog / Excuse',['Tutor + allocation workflow','attendance/payroll history']),
 (355,900,270,90,'AcademicTerm',['Published teaching bounds']),
 (680,900,270,90,'Course',['Unique course code','Rate / budget'])]:s.box(x,y,w,h,t,b)
s.path([(185,290),(185,205),(420,205)])
s.path([(490,290),(490,225)])
s.path([(815,290),(815,205),(680,205)])
s.path([(185,485),(185,230),(420,230)])
s.path([(490,485),(490,390)])
s.path([(815,485),(815,390)])
s.path([(185,700),(330,700),(330,550),(355,550)])
s.path([(490,700),(490,590)])
s.path([(815,700),(815,590)])
s.path([(490,390),(490,900)])
s.path([(815,390),(815,900)])
s.lines(40,1035,['Also in the 30-model dictionary: marks, hour limits, occurrence exceptions, notifications, overflow/claims, staffing requirements,','timesheet revisions/declarations/disputes, booking events, presence and mutation/write receipts.'],14,INK,22)
s.finish('erd','Final source: 30 Prisma application models / 30 migrations at main 361954e.')
print('Rendered eight revised UML SVGs plus current database relationship overview.')
