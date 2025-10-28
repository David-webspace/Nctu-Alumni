-- Oracle SQL script for NCTU Alumni Constitution
-- Generated on 2025-09-24 22:26:30 +08:00

-- Drop existing tables (optional). Comment out if not desired.
BEGIN
  EXECUTE IMMEDIATE 'DROP TABLE articles CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;
/
BEGIN
  EXECUTE IMMEDIATE 'DROP TABLE chapters CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;
/

-- Create tables
CREATE TABLE NCTUALUMNI_CHAPTERS (
  id         NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  chapter_no NUMBER NOT NULL,
  title      VARCHAR2(100 CHAR) NOT NULL,
  slug       VARCHAR2(100 CHAR) NOT NULL
);

CREATE UNIQUE INDEX ux_chapters_chapter_no ON NCTUALUMNI_CHAPTERS(chapter_no);


CREATE UNIQUE INDEX ux_chapters_slug ON NCTUALUMNI_CHAPTERS(slug);

CREATE TABLE NCTUALUMNI_articles (
  id            NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  chapter_id    NUMBER NOT NULL,
  article_no    NUMBER NOT NULL,
  article_label VARCHAR2(20 CHAR) NOT NULL,
  content       CLOB NOT NULL
);

CREATE UNIQUE INDEX ux_articles_article_no ON NCTUALUMNI_articles(article_no);

ALTER TABLE NCTUALUMNI_articles
  ADD CONSTRAINT fk_articles_chapter
  FOREIGN KEY (chapter_id)
  REFERENCES NCTUALUMNI_CHAPTERS(id)
  ON DELETE CASCADE;

-- Insert chapters
INSERT INTO NCTUALUMNI_chapters (chapter_no, title, slug) VALUES (1, '總則', 'general');
INSERT INTO NCTUALUMNI_chapters (chapter_no, title, slug) VALUES (2, '會員', 'member');
INSERT INTO NCTUALUMNI_chapters (chapter_no, title, slug) VALUES (3, '組織及職權', 'organization');
INSERT INTO NCTUALUMNI_chapters (chapter_no, title, slug) VALUES (4, '會議', 'meeting');
INSERT INTO NCTUALUMNI_chapters (chapter_no, title, slug) VALUES (5, '經費與會計', 'funding-and-accounting');
INSERT INTO NCTUALUMNI_chapters (chapter_no, title, slug) VALUES (6, '附則', 'bylaws');
/

-- Insert articles
-- Chapter 1: Articles 1-6
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 1, '第一條', '本會名稱為台灣 交通大學校友總會 (以下簡稱本會)。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 1;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 2, '第二條', '本會為依法設立、非以營利為目的之社會團體，以連繫校友感情、切磋學術、服務社會、宏揚校譽為宗旨。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 1;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 3, '第三條', '本會以全國行政區域為組織區域，並得依法設立分級組織，其名稱為：「省（市）交通大學校友會或縣（市）交通大學校友會」。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 1;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 4, '第四條', '本會會址設於新竹市大學路一 ○○ 一號，並得報經主管機關核准設分支機構。前項分支機構組織簡則由理事會擬訂，報請主管機關核准後行之。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 1;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 5, '第五條', '本會之任務如左：
一、關於校友聯誼互助之事項。
二、關於學術研討之事項。
三、關於促進母校發展之事項。
四、其他符合本會宗旨之事項。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 1;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 6, '第六條', '本會之主管機關為內政部，主要目的事業主管機關為教育部。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 1;
/

-- Chapter 2: Articles 7-12
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 7, '第七條', '本會會員分下列兩種：
一、個人會員：分為常年會員及永久會員，其資格須符合下列所述其中一項：
(一) 凡贊同本會宗旨，在國立交通大學（含新竹交大、前上海交大、唐山工程學院、北平鐵道管理學院及商船專科學校等院校）畢業或肄業者。
(二) 凡曾在第一款所列五院校擔任教職員者。
(三) 對交大有具體貢獻者。
二、團體會員：
(一) 本會分級組織應加入本會為團體會員，並推派代表三~三十人以行使會員權利。
(二) 贊助會員：凡認同本會宗旨之團體。
凡符合上述資格之一者，得填具入會申請書，經理事會通過，並繳納會費後，成為本會會員。（原台北市國立交通大學校友會、新竹市國立交通大學校友會會員為本會當然會員）'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 2;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 8, '第八條', '會員 (會員代表)有表決權、選舉權、被選舉權與罷免權。每一會員(會員代表)為一權。但贊助會員無前述四項權利。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 2;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 9, '第九條', '會員有遵守本會章程、決議及繳納會費之義務。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 2;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 10, '第十條', '會員 (會員代表)有違反法令，章程或不遵守會員大會決議時，得經理事會決議，予以警告或停權處分，其危害團體情節重大者，得經會員大會決議予以除名。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 2;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 11, '第十一條', '會員喪失會員資格或經會員大會決議除名者，即為出會。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 2;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 12, '第十二條', '會員得以書面敘明理由向本會聲明退會。會員經出會或退會者所繳交之各項費用不予退還。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 2;
/

-- Chapter 3: Articles 13-24
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 13, '第十三條', '本會以會員大會為最高權力機構。會員(會員代表)人數超過三百人以上時得分區比例選出會員代表，再召開會員代表大會，行使會員大會職權。會員代表名額、任期及其選舉辦法由理事會擬訂，報請主管機關核備後行之。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 3;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 14, '第十四條', '會員(會員代表)大會之職權如左：
一、訂定與變更章程。
二、選舉及罷免理事、監事。
三、議決入會費、常年會費、事業費及會員捐款之數額及方式。
四、議決年度工作計畫、報告及預算、決算。
五、議決會員(會員代表)之除名處分。
六、議決財產之處分。
七、議決本會之解散。
八、議決與會員權利義務有關之其他重大事項。
前項第八款重大事項之範圍由理事會定之。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 3;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 15, '第十五條', '本會置理事二十七人、監事九人，由會員(會員代表)選舉之，分別成立理事會、監事會。選舉前項理事、監事時，依計票情形得同時選出候補理事九人，候補監事三人，遇理事、監事出缺時，分別依序遞補之。理事、監事得採用通訊選舉。通訊選舉辦法由理事會通過，報請主管機關核備後行之。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 3;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 16, '第十六條', '理事會之職權如左：
一、審定會員(會員代表)之資格。
二、選舉及罷免常務理事、理事長。
三、議決理事、常務理事及理事長之辭職。
四、聘免工作人員。
五、擬訂年度工作計畫、報告及預算、決算。
六、其他應執行事項。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 3;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 17, '第十七條', '理事會置常務理事九人，由理事互選之，並由理事就常務理事中選舉一人為理事長，理事長對內綜理督導會務，對外代表本會，並擔任會員大會、理事會主席。理事長得從常務理事中提名一~三人為副理事長，並經理事會同意後行之。理事長因事不能執行職務時，應指定副理事長一人代理之，未指定或不能指定時，由副理事長互推一人代理之。理事長、副理事長、常務理事出缺時，應於一個月內補選之。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 3;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 18, '第十八條', '監事會置常務監事三人，由監事互選之，並由監事就常務監事中選舉一人為監事會召集人，監察日常會務，並擔任監事會主席。監事會召集人因事不能執行職務時，應指定常務監事一人代理之，未指定或不能指定時，由常務監事互推一人代理之。監事會主席、常務監事出缺時，應於一個月內補選之。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 3;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 19, '第十九條', '理事、監事均為無給職，任期三年，連選得連任。理事長之連任以一次為限。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 3;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 20, '第二十條', '監事會之職權如左：
一、監察理事會工作之執行。
二、審核年度決算。
三、選舉及罷免常務監事。
四、議決監事及常務監事之辭職。
五、其他應監察事項。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 3;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 21, '第二十一條', '本會置秘書長一人，承理事長之命處理本會事務，由理事長提名經理事會通過聘免之，並報主管機關備查。秘書長之解聘應先報主管機關核備。秘書長不得由理、監事擔任。其權責及分層負責事項由理事會另定之。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 3;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 22, '第二十二條', '理事、監事有左列情事之一者，應即解任：
一、喪失會員(會員代表)資格者。
二、因故辭職經理事會或監事會決議通過者。
三、被罷免或撤免者。
四、受停權處分期間逾任期二分之一者。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 3;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 23, '第二十三條', '本會得設各種委員會、小組或其他內部作業組織，其組織簡則由理事會擬訂，報經主管機關核備後施行，變更時亦同。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 3;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 24, '第二十四條', '本會得由理事會聘請名譽理事長、名譽理事、顧問若干人，其聘期與理事、監事之任期同。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 3;
/

-- Chapter 4: Articles 25-29
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 25, '第二十五條', '會員(會員代表)大會分定期會議與臨時會議二種，由理事長召集，召集時除緊急事故之臨時會議外應於十五日前以書面通知之。定期會議每年召開一次：臨時會議於理事會認為必要，或經會員(會員代表)五分之一以上之請求，或監事會函請召集時召開之。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 4;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 26, '第二十六條', '會員(會員代表)不能親自出席會員大會時，得以書面委託其他會員(會員代表)代理，每一會員(會員代表)以代理一人為限。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 4;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 27, '第二十七條', '會員(會員代表)大會之決議，以會員(會員代表)過半數之出席，出席人數較多數之同意行之。但左列事項之決議以出席人數三分之二以上同意行之：
一、章程之訂定與變更。
二、會員(會員代表)之除名。
三、理事、監事之罷免。
四、財產之處分。
五、本會之解散。
六、其他與會員權利義務有關之重大事項。
本會辦理法人登記後，章程之變更以出席人數四分之三以上之同意或全體會員三分之二以上書面之同意行之。本會之解散，得隨時以全體會員三分之二以上之表決解散之。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 4;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 28, '第二十八條', '理事會每六個月召開一次，監事會每六個月召開一次，必要時得召開聯席會議或臨時會議。前項會議召集時除臨時會議外，應於七日前以書面通知，會議之決議，各以理事、監事過半數之出席，出席人數較多數之同意行之。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 4;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 29, '第二十九條', '理事應出席理事會議，監事應出席監事會議，不得委託出席。理事、監事連續二次無故缺席理事會、監事會者，視同辭職。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 4;
/

-- Chapter 5: Articles 30-33
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 30, '第三十條', '本會經費來源如下：
一、入會費：個人會員新台幣伍佰元，團體會員新台幣壹萬元，於會員入會時繳納。
二、常年會費：個人會員新台幣壹仟伍佰元，團體會員新台幣參萬元。
三、永久會費：個人會員新台幣壹萬伍仟元。
四、事業費。
五、會員捐款。
六、委託收益。
七、基金及其孳息。
八、其他收入。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 5;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 31, '第三十一條', '本會會計年度以曆年為準，自每年一月一日起至十二月三十一日止。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 5;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 32, '第三十二條', '本會每年於會計年度開始前二個月由理事會編造年度工作計畫、收支預算表、員工待遇表，提會員大會通過(會員大會因故未能如期召開者，先提理監事聯席會議通過)，於會計年度開始前報主管機關核備。並於會計年度終了後二個月內由理事會編造年度工作報告、收支決算表、現金出納表、資產負債表、財錄目錄及基金收支表，送監事會審核後，造具審核意見書送還理事會，提會員大會通過，於三月底前報主管機關核備(會員大會未能如期召開者，先報主管機關。)'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 5;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 33, '第三十三條', '本會於解散後，剩餘財產歸屬所在地之地方自治團體或主管機關指定之機關團體所有。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 5;
/

-- Chapter 6: Articles 34-36
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 34, '第三十四條', '本章程經會員(會員代表)大會通過，報經主管機關核備後施行，變更時亦同。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 6;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 35, '第三十五條', '本章程經本會八十九年十一月十八日第一屆第一次會員大會通過。報經內政部九十年一月二十九日台(九十)內社字第九○○三○六○號證書准予設立。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 6;
/
INSERT INTO NCTUALUMNI_articles (chapter_id, article_no, article_label, content)
SELECT c.id, 36, '第三十六條', '本章程未規定事項，悉依有關法令規定辦理。'
FROM NCTUALUMNI_chapters c WHERE c.chapter_no = 6;
/

-- Done
PROMPT Constitution tables and data created.
