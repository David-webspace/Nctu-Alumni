"use client";
// app/about/constitution/page.tsx
import Link from 'next/link';
import GoToTopButton from '@/app/hooks/GoToTopButton';


export default function ConstitutionPage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-2 sm:px-4">
      {/* Go to Top Floating Button */}
      <GoToTopButton />
      <div className="mb-4">
        <Link href="/" className="inline-block px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          ← 回首頁
        </Link>
      </div>
      <h1 className="text-4xl text-black font-extrabold mb-8 tracking-tight text-center border-b pb-4">組織章程與架構</h1>
      <nav className="mb-10">
        <ul className="flex flex-wrap justify-center gap-3 sm:gap-5 bg-blue-50 rounded-lg px-4 py-2 shadow-sm border">
          <li><a href="#general" className="smooth-scroll font-semibold text-blue-700 hover:text-blue-900 transition underline underline-offset-4">總則</a></li>
          <li><a href="#member" className="smooth-scroll font-semibold text-blue-700 hover:text-blue-900 transition underline underline-offset-4">會員</a></li>
          <li><a href="#organization" className="smooth-scroll font-semibold text-blue-700 hover:text-blue-900 transition underline underline-offset-4">組織及職權</a></li>
          <li><a href="#meeting" className="smooth-scroll font-semibold text-blue-700 hover:text-blue-900 transition underline underline-offset-4">會議</a></li>
          <li><a href="#funding-and-accounting" className="smooth-scroll font-semibold text-blue-700 hover:text-blue-900 transition underline underline-offset-4">經費與會計</a></li>
          <li><a href="#bylaws" className="smooth-scroll font-semibold text-blue-700 hover:text-blue-900 transition underline underline-offset-4">附則</a></li>
          <li><a href="#structure" className="smooth-scroll font-semibold text-blue-700 hover:text-blue-900 transition underline underline-offset-4">組織架構</a></li>
        </ul>
      </nav>

      <section id="general" className="mb-10 text-black bg-white/80 rounded-xl shadow p-6 border">
        <h2 className="text-2xl font-bold mb-1 border-l-4 border-blue-400 pl-3">總則</h2>
        <h3 className="text-lg font-semibold mb-4 text-blue-800">第一章</h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第一條</span>
            <p className="">本會名稱為台灣 交通大學校友總會 (以下簡稱本會)。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第二條</span>
            <p>本會為依法設立、非以營利為目的之社會團體，以連繫校友感情、切磋學術、服務社會、宏揚校譽為宗旨。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第三條</span>
            <p>本會以全國行政區域為組織區域，並得依法設立分級組織，其名稱為：『省（市）交通大學校友會或縣（市）交通大學校友會』。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第四條</span>
            <p>本會會址設於新竹市大學路一 ○○ 一號，並得報經主管機關核准設分支機構。 前項分支機構組織簡則由理事會擬訂，報請主管機關核准後行之。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第五條</span>
            <p>本會之任務如左：<br/>一、關於校友聯誼互助之事項。<br/>二、關於學術研討之事項。<br/>三、關於促進母校發展之事項。<br/>四、其他符合本會宗旨之事項。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第六條</span>
            <p>本會之主管機關為內政部，主要目的事業主管機關為教育部。</p>
          </div>
        </div>
      </section>

      <section id="member" className="mb-10 text-black bg-white/80 rounded-xl shadow p-6 border">
        <h2 className="text-2xl font-bold mb-1 border-l-4 border-blue-400 pl-3">會員</h2>
        <h3 className="text-lg font-semibold mb-4 text-blue-800">第二章</h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第七條</span>
            <p>本會會員分下列兩種：<br/>一、個人會員：分為常年會員及永久會員，其資格須符合下列所述其中一項：<br/>(一) 凡贊同本會宗旨，在國立交通大學（含新竹交大、前上海交大、唐山工程學院、北平鐵道管理學院及商船專科學校等院校）畢業或肄業者。<br/>(二) 凡曾在第一款所列五院校擔任教職員者。<br/>(三) 對交大有具體貢獻者。<br/>二、團體會員：<br/>(一) 本會分級組織應加入本會為團體會員，並推派代表三~三十人以行使會員權利。<br/>(二) 贊助會員：凡認同本會宗旨之團體。<br/>凡符合上述資格之一者，得填具入會申請書，經理事會通過，並繳納會費後，成為本會會員。（原台北市國立交通大學校友會、新竹市國立交通大學校友會會員為本會當然會員）</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第八條</span>
            <p>會員 (會員代表)有表決權、選舉權、被選舉權與罷免權。每一會員(會員代表)為一權。但贊助會員無前述四項權利。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第九條</span>
            <p>會員有遵守本會章程、決議及繳納會費之義務。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第十條</span>
            <p>會員 (會員代表)有違反法令，章程或不遵守會員大會決議時，得經理事會決議，予以警告或停權處分，其危害團體情節重大者，得經會員大會決議予以除名。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第十一條</span>
            <p>會員喪失會員資格或經會員大會決議除名者，即為出會。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第十二條</span>
            <p>會員得以書面敘明理由向本會聲明退會。會員經出會或退會者所繳交之各項費用不予退還。</p>
          </div>
        </div>
      </section>

      <section id="organization" className="mb-10 text-black bg-white/80 rounded-xl shadow p-6 border">
        <h2 className="text-2xl font-bold mb-1 border-l-4 border-blue-400 pl-3">組織及職權</h2>
        <h3 className="text-lg font-semibold mb-4 text-blue-800">第三章</h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第十三條</span>
            <p>本會以會員大會為最高權力機構。會員(會員代表)人數超過三百人以上時得分區比例選出會員代表，再召開會員代表大會，行使會員大會職權。會員代表名額、任期及其選舉辦法由理事會擬訂，報請主管機關核備後行之。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第十四條</span>
            <div>
              <p>會員(會員代表)大會之職權如左：</p>
              <ul className="list-disc ml-6 mt-1">
                <li>一、訂定與變更章程。</li>
                <li>二、選舉及罷免理事、監事。</li>
                <li>三、議決入會費、常年會費、事業費及會員捐款之數額及方式。</li>
                <li>四、議決年度工作計畫、報告及預算、決算。</li>
                <li>五、議決會員(會員代表)之除名處分。</li>
                <li>六、議決財產之處分。</li>
                <li>七、議決本會之解散。</li>
                <li>八、議決與會員權利義務有關之其他重大事項。</li>
                <li>前項第八款重大事項之範圍由理事會定之。</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第十五條</span>
            <p>本會置理事二十七人、監事九人，由會員(會員代表)選舉之，分別成立理事會、監事會。選舉前項理事、監事時，依計票情形得同時選出候補理事九人，候補監事三人，遇理事、監事出缺時，分別依序遞補之。理事、監事得採用通訊選舉。通訊選舉辦法由理事會通過，報請主管機關核備後行之。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第十六條</span>
            <div>
              <p>理事會之職權如左：</p>
              <ul className="list-disc ml-6 mt-1">
                <li>一、審定會員(會員代表)之資格。</li>
                <li>二、選舉及罷免常務理事、理事長。</li>
                <li>三、議決理事、常務理事及理事長之辭職。</li>
                <li>四、聘免工作人員。</li>
                <li>五、擬訂年度工作計畫、報告及預算、決算。</li>
                <li>六、其他應執行事項。</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第十七條</span>
            <p>理事會置常務理事九人，由理事互選之，並由理事就常務理事中選舉一人為理事長，理事長對內綜理督導會務，對外代表本會，並擔任會員大會、理事會主席。理事長得從常務理事中提名一~三人為副理事長，並經理事會同意後行之。理事長因事不能執行職務時，應指定副理事長一人代理之，未指定或不能指定時，由副理事長互推一人代理之。理事長、副理事長、常務理事出缺時，應於一個月內補選之。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第十八條</span>
            <p>監事會置常務監事三人，由監事互選之，並由監事就常務監事中選舉一人為監事會召集人，監察日常會務，並擔任監事會主席。監事會召集人因事不能執行職務時，應指定常務監事一人代理之，未指定或不能指定時，由常務監事互推一人代理之。監事會主席、常務監事出缺時，應於一個月內補選之。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第十九條</span>
            <p>理事、監事均為無給職，任期三年，連選得連任。理事長之連任以一次為限。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第二十條</span>
            <div>
              <p>監事會之職權如左：</p>
              <ul className="list-disc ml-6 mt-1">
                <li>一、監察理事會工作之執行。</li>
                <li>二、審核年度決算。</li>
                <li>三、選舉及罷免常務監事。</li>
                <li>四、議決監事及常務監事之辭職。</li>
                <li>五、其他應監察事項。</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第二十一條</span>
            <p>本會置秘書長一人，承理事長之命處理本會事務，由理事長提名經理事會通過聘免之，並報主管機關備查。秘書長之解聘應先報主管機關核備。秘書長不得由理、監事擔任。其權責及分層負責事項由理事會另定之。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第二十二條</span>
            <div>
              <p>理事、監事有左列情事之一者，應即解任：</p>
              <ul className="list-disc ml-6 mt-1">
                <li>一、喪失會員(會員代表)資格者。</li>
                <li>二、因故辭職經理事會或監事會決議通過者。</li>
                <li>三、被罷免或撤免者。</li>
                <li>四、受停權處分期間逾任期二分之一者。</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第二十三條</span>
            <p>本會得設各種委員會、小組或其他內部作業組織，其組織簡則由理事會擬訂，報經主管機關核備後施行，變更時亦同。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第二十四條</span>
            <p>本會得由理事會聘請名譽理事長、名譽理事、顧問若干人，其聘期與理事、監事之任期同。</p>
          </div>
        </div>
      </section>

      <section id="meeting" className="mb-10 text-black bg-white/80 rounded-xl shadow p-6 border">
        <h2 className="text-2xl font-bold mb-1 border-l-4 border-blue-400 pl-3">會議</h2>
        <h3 className="text-lg font-semibold mb-4 text-blue-800">第四章</h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第二十五條</span>
            <p>會員(會員代表)大會分定期會議與臨時會議二種，由理事長召集，召集時除緊急事故之臨時會議外應於十五日前以書面通知之。定期會議每年召開一次：臨時會議於理事會認為必要，或經會員(會員代表)五分之一以上之請求，或監事會函請召集時召開之。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第二十六條</span>
            <p>會員(會員代表)不能親自出席會員大會時，得以書面委託其他會員(會員代表)代理，每一會員(會員代表)以代理一人為限。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第二十七條</span>
            <div>
              <p>會員(會員代表)大會之決議，以會員(會員代表)過半數之出席，出席人數較多數之同意行之。但左列事項之決議以出席人數三分之二以上同意行之：</p>
              <ul className="list-disc ml-6 mt-1">
                <li>一、章程之訂定與變更。</li>
                <li>二、會員(會員代表)之除名。</li>
                <li>三、理事、監事之罷免。</li>
                <li>四、財產之處分。</li>
                <li>五、本會之解散。</li>
                <li>六、其他與會員權利義務有關之重大事項。</li>
                <li>本會辦理法人登記後，章程之變更以出席人數四分之三以上之同意或全體會員三分之二以上書面之同意行之。本會之解散，得隨時以全體會員三分之二以上之表決解散之。</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第二十八條</span>
            <p>理事會每六個月召開一次，監事會每六個月召開一次，必要時得召開聯席會議或臨時會議。前項會議召集時除臨時會議外，應於七日前以書面通知，會議之決議，各以理事、監事過半數之出席，出席人數較多數之同意行之。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第二十九條</span>
            <p>理事應出席理事會議，監事應出席監事會議，不得委託出席。理事、監事連續二次無故缺席理事會、監事會者，視同辭職。</p>
          </div>
        </div>
      </section>

      <section id="funding-and-accounting" className="mb-10 text-black bg-white/80 rounded-xl shadow p-6 border">
        <h2 className="text-2xl font-bold mb-1 border-l-4 border-blue-400 pl-3">經費與會計</h2>
        <h3 className="text-lg font-semibold mb-4 text-blue-800">第五章</h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第三十條</span>
            <div>
              <p>本會經費來源如下：</p>
              <ul className="list-disc ml-6 mt-1">
                <li>一、入會費：個人會員新台幣伍佰元，團體會員新台幣壹萬元，於會員入會時繳納。</li>
                <li>二、常年會費：個人會員新台幣壹仟伍佰元，團體會員新台幣參萬元。</li>
                <li>三、永久會費：個人會員新台幣壹萬伍仟元。</li>
                <li>四、事業費。</li>
                <li>五、會員捐款。</li>
                <li>六、委託收益。</li>
                <li>七、基金及其孳息。</li>
                <li>八、其他收入。</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第三十一條</span>
            <p>本會會計年度以曆年為準，自每年一月一日起至十二月三十一日止。</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第三十二條</span>
            <p>本會每年於會計年度開始前二個月由理事會編造年度工作計畫、收支預算表、員工待遇表，提會員大會通過(會員大會因故未能如期召開者，先提理監事聯席會議通過)，於會計年度開始前報主管機關核備。並於會計年度終了後二個月內由理事會編造年度工作報告、收支決算表、現金出納表、資產負債表、財錄目錄及基金收支表，送監事會審核後，造具審核意見書送還理事會，提會員大會通過，於三月底前報主管機關核備(會員大會未能如期召開者，先報主管機關。)</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className="font-bold w-24 shrink-0">第三十三條</span>
            <p>本會於解散後，剩餘財產歸屬所在地之地方自治團體或主管機關指定之機關團體所有。</p>
          </div>
        </div>
      </section>    

      <section id="bylaws" className="mb-10 text-black bg-white/80 rounded-xl shadow p-6 border">
        <h2 className="text-2xl font-bold mb-1 border-l-4 border-blue-400 pl-3">附則</h2>
        <h3 className="text-lg font-semibold mb-4 text-blue-800">第六章</h3>
        <div className="flex flex-col sm:flex-row sm:items-start gap-2">
          <span className="font-bold w-24 shrink-0">第三十四條</span>
          <p>本章程經會員(會員代表)大會通過，報經主管機關核備後施行，變更時亦同。</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start gap-2">
          <span className="font-bold w-24 shrink-0">第三十五條</span>
          <p>本章程經本會八十九年十一月十八日第一屆第一次會員大會通過。報經內政部九十年一月二十九日台(九十)內社字第九○○三○六○號證書准予設立。</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start gap-2">
          <span className="font-bold w-24 shrink-0">第三十六條</span>
          <p>本章程未規定事項，悉依有關法令規定辦理。</p>
        </div>
      </section>

      <section id="structure" className="mb-10 text-black bg-white/80 rounded-xl shadow p-6 border">
        <h2 className="text-2xl font-bold mb-1 border-l-4 border-blue-400 pl-3">組織架構</h2>
        <p className="mb-2 text-black">組織架構</p>
        <ul className="list-disc ml-6">
          <li>
            <a href="https://www.nycu.edu.tw/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900 transition">
              國立陽明交通大學網站
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/NCTUer" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900 transition">
              交大校友會FB
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}