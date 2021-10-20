import { Component, Input, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  

  
  conditionShowCharact: boolean = true;
  stLink!: any;
  numStayCharact: number = 0;
  numHome: number = 0;
  srcImage: any = '/assets/characters/tohru.png';
  nameCharacter: string = 'Tohru';
  controls: string = "?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0&autoplay=1";
  obersavleImage!: Observable<any>;
  subscription!: Subscription;


  //Characters______________________________________________________________
  array: Array<Array<any>> = new Array<Array<any>>(['/assets/characters/tohruFace.jpg', 'Tohru', '/assets/characters/tohru.png',
  'Tohru Kobayashi', "(トール, Tōru) also known as Tohru Kobayashi (小林トール Kobayashi Tōru) is one of the main characters in the series Kobayashi-san Chi no Maid Dragon. Tohru is a female dragon with the ability to transform into a human girl. After Kobayashi rescues her, she falls in love with her and decides to work for her as a maid", 
  [['-Rōmaji:', ' Tōru;'], ['-Age:', ' 16 (appearance);'], ['-Gender:', ' Female;'], ['-Hair Color:', ' Blonde (fades into orange and pink highlights);'], ['-Eye Color:', " Yellow (dragon form) Red Orange (human form);"], ['-Faction:', ' Chaos Faction;'], ['-Relatives', ' Damocles (father);']]],
  ['/assets/characters/kannanFace.png', 'Kanna', '/assets/characters/kannan.png', 'Kanna Kobayashi', "(カンナカムイ) also known as Kanna Kobayashi (小林 カンナ Kobayashi Kanna), is one of the main characters in Miss Kobayashi's Dragon Maid and is one of the main characters in Miss Kobayashi's Dragon Maid: Kanna's Daily Life. Kanna is a young female dragon, who is exiled from her world as a consequence of her pranks.",
  [['-Japanese:', ' カンナカムイ;'], ['-Age:', ' 9 (appearance);'], ['-Gender:', ' Female;'], ['-Hair Color:', ' White-lavender;'], ['-Eye Color:', " Blue;"], ['-Faction:', ' Unaffiliated;'], ['-Relatives', ' Kimun Kamui (father);']]], 
  ['/assets/characters/kobayashiFace.png', 'Kobayashi', '/assets/characters/kobayashi.png', 'Kobayashi', "Kobayashi is the principle character of Miss Kobayashi’s Dragon Maid. She works as a pc programmer at Jigokumeguri System Engineering Inc. Regardless that Kobayashi maintains a cool demeanor, she is taken into account sort and reliable amongst her mates and colleagues.",
  [['-Japanese:', ' 小林;'], ['-Age:', ' 25;'], ['-Gender:', ' Female;'], ['-Hair Color:', ' Red;'], ['-Eye Color:', " Hazel;"]]], 
  ['/assets/characters/elmaFace.png',  'Elma', '/assets/characters/elma.png', "Elma", "(エルマ Eruma) is one of supporting characters in the series Miss Kobayashi's Dragon Maid and the main protagonist of Miss Kobayashi's Dragon Maid: Elma's Office Lady Diary. She is a female dragon from the Dragon Faction of Harmony, the opposing faction of Chaos (which Tohru belongs to).",
  [['-Japanese:', ' エルマ;'], ['-Age:', ' 18 (appearance);'], ['-Gender:', ' Female;'], ['-Hair Color:', ' Black with purple tips;'], ['-Eye Color:', " Blue;"], ['-Faction:', ' Harmony Faction;'], ['-Relatives', ' Telne (Grandmother);']]],
  ['/assets/characters/lucoaFace.png', 'Lucoa','/assets/characters/lucoa.png', 'Lucao', "Quetzalcoatl (ケツァルコアトル Ketsarukoatoru), often referred to as Lucoa (ルコア Rukoa), is a supporting character of Kobayashi-san Chi no Maid Dragon and a main protagonist of Kobayashi-san-chi no Maid Dragon: Lucoa wa Boku no xx Desu. She is a former dragon goddess and an old friend of Tohru who was exiled from her seat of goddess after consuming some cursed liquor that led her to enter into a scandalous affair.", 
  [['-Japanese:', ' ケツァルコアトル;'], ['-Rōmaji:', ' Ketsarukoatoru;'], ['-Age:', ' 18 (appearance);'], ['-Gender:', ' Female;'], ['-Hair Color:', ' Blonde;'], ['-Eye Color:', " Green (right) and Blue (left);"], ['-Faction:', ' Spectating Faction (Neutral);'], ['-Relatives', ' Quetzalpetlatl (Sister);']]], 
  ['/assets/characters/fatnirFace.png', 'Fafnir', '/assets/characters/Fafnir.png', 'Fafnir', "Fafnir (ファフニール Fafunīru) or Takeshi Ooyama (大山 猛 Ōyama Takeshi) is a supporting character in the Miss Kobayashi's Dragon Maid series and the main protagonist of Miss Kobayashi's Dragon Maid: Fafnir the Recluse. He is Makoto Takiya ’s roommate and friend.", 
  [['-Japanese:', ' ファフニール;'], ['-Gender:', ' Male;'], ['-Hair Color:', ' Black;'], ['-Eye Color:', " Red;"], ['-Faction:', ' Chaos Faction;']]],
  ['/assets/characters/shoutaFace.png',  'Shouta', '/assets/characters/shouta.png', 'Shouta Magatsuchi', 'Shouta Magatsuchi (真ヶ土 翔太 Magatsuchi Shōta) is a supporting character in Kobayashi-san Chi no Maid Dragon and one of the main characters in Kobayashi-san-chi no Maid Dragon: Lucoa wa Boku no xx Desu. He is a young boy born into a family of mages in the modern world.', 
  [['-Japanese:', ' 真ヶ土 翔太;'], ['-Age:', ' 11;'], ['-Gender:', ' Male;'], ['-Hair Color:', ' Purple;'], ['-Eye Color:', " Purple;"], ['-Relatives:', ' Mr. Magatsuchi (father) and Saori Magatsuchi (mother)']]],
  ['/assets/characters/rikoFace.png',  'Riko', '/assets/characters/riko.png', 'Riko Saikawa', "Riko Saikawa (才川 リコ Saikawa Riko) is one of the supporting characters in Kobayashi-san Chi no Maid Dragon and one of the main characters of Kobayashi-san Chi no Maid Dragon: Kanna no Nichijou. She is Kanna Kamui 's friend and classmate.",
  [['-Japanese:', ' 才川 リコ;'], ['-Age:', ' 9;'], ['-Gender:', ' Female;'], ['-Hair Color:', ' Brown;'], ['-Eye Color:', " Blue-Green;"], ['-Relatives:', ' Georgie Saikawa (older sister) and Unnamed Mother and Father']]], 
  ['/assets/characters/georgiFace.png', 'Georgi', '/assets/characters/georgi.png', 'Georgie Saikawa', "Georgie is a sweet and gentle lady. She always supports Riko and her family. She seems to know a lot about maids and has a huge passion for them. She mentions that she's wanted to be one since she was a kid when she read a book about maids. She has gotten so dedicated to being a maid that she tends to forget her given name “Nae”, when out of costume.",
  [['-Japanese:', ' 才川 ジョージー;'], ['-Age:', ' 15;'], ['-Gender:', ' Female;'], ['-Hair Color:', ' Brown;'], ['-Eye Color:', " Green;"], ['-Relatives:', ' Riko Saikawa (younger sister) and Unnamed Mother and Father']]], 
  ['/assets/characters/makotoFace.png',  'Makoto', '/assets/characters/makoto.png', 'Makoto Takiya', "Makoto Takiya (滝谷 真 Takiya Makoto) is a supporting character in Kobayashi-san Chi no Maid Dragon. He is Kobayashi 's friend and her coworker in Jigokumeguri System Engineering Inc.",
  [['-Japanese:', ' 滝谷 真;'], ['-Age:', ' 24;'],['-Gender:', ' Male;'], ['-Hair Color:', ' Black;'], ['-Eye Color:', " Dark Blue;"]]], 
  ['/assets/characters/iluluFace.png', 'Ilulu', '/assets/characters/ilulu.jpg', 'Ilulu', 'When she first appeared, Ilulu was a psychotic, war-mongering force with a firm hatred for humanity. Once she redeems herself, Ilulu had some difficulties adjusting to human society, despite being roughly the same age as Tohru. As such, Kobayashi often tasks Tohru with babysitting Ilulu. She also was determined to find her purpose in life, even though her initial conclusion was too lewd to put into serious consideration. Despite being thousands of years old, she behaves like a child similarly to Kanna, even though there are a few obvious differences.',
  [['-Japanese:', ' イルル;'], ['-Age:', ' 16 (appearance);'], ['-Gender:', ' Female;'], ['-Hair Color:', ' Salmon;'], ['-Eye Color:', ' Pink;'], ['-Faction:', ' Chaos Faction;']]]);
  characterInfo: string = this.array[0][4];

  arrayCharacteristics: Array<any> = new Array<any>(['-Rōmaji:', ' Tōru;'], ['-Age:', ' 16 (appearance);'], ['-Gender:', ' Female;'], 
  ['-Hair Color:', ' Blonde (fades into orange and pink highlights);'],
  ['-Eye Color:', " Yellow (dragon form) Red Orange (human form);"], 
  ['-Faction:', ' Chaos Faction;'], ['-Relatives', ' Damocles (father);']);


  arrayH: Array<Array<any>> = new Array<Array<any>>(['/assets/characters/kannaFaceH.png', 'https://www.youtube.com/embed/7B0PaZHRcyw'],
  ['/assets/characters/tohruFaceH.png', 'https://www.youtube.com/embed/_LPrWxBOW0A'],
  ['/assets/characters/elmaFaceH.png', 'https://www.youtube.com/embed/epHLomi3bag'],
  ['/assets/characters/lucoaFaceH.png', 'https://www.youtube.com/embed/4QKrWTEWUa4']);


  arrayTempoS: Array<any> = new Array<any>('/assets/characters/seasonImg2.png', 'Kobayashi-san Chi no Maid Dragon',
  '小林さんちのメイドラゴン', "As Kobayashi sets off for another day at work, she opens her apartment door only to be met by an unusually frightening sight—the head of a dragon, staring at her from across the balcony. The dragon immediately transforms into a cute, busty, and energetic young girl dressed in a maid outfit, introducing herself as Tooru. Despite being extremely efficient at her job, the maid's unorthodox methods of housekeeping often end up horrifying Kobayashi and at times bring more trouble than help. Furthermore, the circumstances behind the dragon's arrival on Earth seem to be much more complicated than at first glance, as Tooru bears some heavy emotions and painful memories. To top it all off, Tooru's presence ends up attracting several other mythical beings to her new home, bringing in a host of eccentric personalities. Although Kobayashi makes her best effort to handle the crazy situation that she has found herself in, nothing has prepared her for this new life with a dragon maid.",
  [['English: ', "Miss Kobayashi's Dragon Maid"], ['Synonyms: ', "The maid dragon of Kobayashi-san"], ['Type: ', 'TV'],
  ['Episodes: ', '13'], ['Status: ', 'Finished Airing'], ['Aired: ', 'Jan 12, 2017 to Apr 06, 2017'], ['Season: ', 'Winter 2017'],
  ['Studio: ', 'Kyoto Animation'], ['Duration: ', '24 minutes'] ]);


  arrayFinalS: Array<any> = new Array<any>(

  ['/assets/characters/seasonImg2.png', 'Kobayashi-san Chi no Maid Dragon',
    '小林さんちのメイドラゴン', "As Kobayashi sets off for another day at work, she opens her apartment door only to be met by an unusually frightening sight—the head of a dragon, staring at her from across the balcony. The dragon immediately transforms into a cute, busty, and energetic young girl dressed in a maid outfit, introducing herself as Tooru. Despite being extremely efficient at her job, the maid's unorthodox methods of housekeeping often end up horrifying Kobayashi and at times bring more trouble than help. Furthermore, the circumstances behind the dragon's arrival on Earth seem to be much more complicated than at first glance, as Tooru bears some heavy emotions and painful memories. To top it all off, Tooru's presence ends up attracting several other mythical beings to her new home, bringing in a host of eccentric personalities. Although Kobayashi makes her best effort to handle the crazy situation that she has found herself in, nothing has prepared her for this new life with a dragon maid.",
  [['English: ', "Miss Kobayashi's Dragon Maid"], ['Synonyms: ', "The maid dragon of Kobayashi-san"], ['Type: ', 'TV'],
  ['Episodes: ', '13'], ['Status: ', 'Finished Airing'], ['Aired: ', 'Jan 12, 2017 to Apr 06, 2017'], ['Season: ', 'Winter 2017'],
  ['Studio: ', 'Kyoto Animation'], ['Duration: ', '24 minutes'] ]],
  
  ['/assets/characters/imgTitleOO.png', 'Kobayashi-san Chi no OO Dragon',
  '小林さんちの○○ドラゴン', "Specials included with the BD/DVD release of Kobayashi-san Chi no Maid Dragon.",
  [['English: ', "Miss Kobayashi's Dragon Maid Specials"], ['Synonyms: ', "The Maid Dragon of Kobayashi-san Specials, Kobayashi-san Chi no Maid Dragon Specials"], ['Type: ', 'Special'],
  ['Episodes: ', '7'], ['Status: ', 'Finished Airing'], ['Aired: ', 'Mar 15, 2017 to Sep 20, 2017'], ['Season: ', 'Spring 2017'],
  ['Studio: ', 'Kyoto Animation'], ['Duration: ', '3 minutes'] ]],

  ['/assets/characters/imgTitlevalen.png', 'Kobayashi-san Chi no Maid Dragon: Valentine, Soshite Onsen! - Amari Kitai Shinaide Kudasai',
  '小林さんちのメイドラゴン バレンタイン, そして温泉! (あまり期待しないでください)', "Unaired episode included with the 7th volume of the BD/DVD release of Kobayashi-san Chi no Maid Dragon.",
  [['English: ', "Miss Kobayashi's Dragon Maid Episode 14: Valentine's, and Then Hot Springs! - Please Don't Get Your Hopes Up"], ['Synonyms: ', "Kobayashi-san Chi no Maid Dragon"], ['Type: ', 'Special'],
  ['Episodes: ', '1'], ['Status: ', 'Finished Airing'], ['Aired: ', 'Sep 20, 2017'], ['Season: ', 'Fall 2017'],
  ['Studio: ', 'Kyoto Animation'], ['Duration: ', '23 minutes'] ]],

  ['/assets/characters/seasonImg.png', 'Kobayashi-san Chi no Maid Dragon S',
  '小林さんちのメイドラゴンS', "As Tooru continues on her quest to become the greatest maid and Kanna Kamui fully immerses in her life as an elementary school student, there is not a dull day in the Kobayashi household with mischief being a daily staple. On one such day, however, a massive landslide is spotted on the hill where Kobayashi and Tooru first met—a clear display of a dragon's might. When none of the dragons they know claim responsibility, the perpetrator herself descends from the  skies: Ilulu, the radical Chaos Dragon with monstrous power rivaling that of Tooru. Sickened by Tooru's involvement with humans, Ilulu resorts to the typical dragon method of resolving conflict—a battle to the death. Despite such behavior, she becomes intrigued by Kobayashi's ability to befriend dragons and decides instead to observe just what makes Kobayashi so special. With a new troublesome dragon in town, Kobayashi's eccentric life with a dragon maid is only getting merrier.",
  [['English: ', "Miss Kobayashi's Dragon Maid S"], ['Synonyms: ', "Kobayashi-san Chi no Maid Dragon 2nd Season, Miss Kobayashi's Dragon Maid 2nd Season, The maid dragon of Kobayashi-san 2nd Season"], ['Type: ', 'TV'],
  ['Episodes: ', '12'], ['Status: ', 'Finished Airing'], ['Aired: ', 'Jul 08, 2021 to Sep 23, 2021'], ['Season: ', 'Summer 2021'],
  ['Studio: ', 'Kyoto Animation'], ['Duration: ', '23 minutes'] ]],

  ['/assets/characters/imgTitleMini.png', 'Kobayashi-san Chi no Maid Mini Dragon',
  'ミニドラ', "Commemoration mini-anime series released on Kyoani YouTube Channel ahead of Kobayashi-san Chi no Maid Dragon S.",
  [['English: ', "Miss Kobayashi's Dragon Maid S Short Animation Series"], ['Synonyms: ', "Minidora, Kobayashi-san Chi no Maid Dragon S: Mini Dragon"], ['Type: ', 'ONA'],
  ['Episodes: ', '13'], ['Status: ', 'Finished Airing'], ['Aired: ', 'Apr 07, 2021 to Jun 30, 2021'], ['Season: ', 'Spring 2021'],
  ['Studio: ', 'Kyoto Animation'], ['Duration: ', '1 minutes'] ]],

  ['/assets/characters/imgTitlespecial.png', 'Mini Dragon Specials',
  'ミニドラ', "Includes 3 special Mini Dragon episodes released within Kobayashi-san Chi no Maid Dragon S's broadcast period and 5 BD/DVD extras.",
  [['English: ', "Miss Kobayashi's Dragon Maid S Short Animation Series"], ['Synonyms: ', "Mini Dragon EX, Mini Dragon SP"], ['Type: ', 'Special'],
  ['Episodes: ', '8'], ['Status: ', 'Currently Airing'], ['Aired: ', 'Jul 08, 2021 to Jan 19, 2022'], ['Season: ', 'Summer 2021'],
  ['Studio: ', 'Kyoto Animation'], ['Duration: ', '1 minutes'] ]],

  );
  


  constructor(private dom: DomSanitizer, private http: HttpClient){}

  ngOnInit(): void {
    this.stLink = this.dom.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/7B0PaZHRcyw'+this.controls);
  }

  
  //Link page______________________________________________________________
  linkedPage(){
    window.location.replace('http://www.kyotoanimation.co.jp/en/');
  }

  //Characters______________________________________________________________
  MouseOverOutCharact(arrCount: number, condition: boolean){
    const doc = document.querySelector('.numCon'+arrCount);
    const query = <HTMLDivElement>doc;
    if(this.numStayCharact != arrCount){
      if(condition){
        query.style.display = 'flex';
      }else{
        query.style.display = 'none';
      } 
    }
  }


  //Characters ICON______________________________________________________________
  clickedCharact(num: number, query: string){
    if(this.numStayCharact != num){

      this.conditionShowCharact = false;

      const doc1 = document.querySelector('.charactersDisplay');
      const doc2 = document.querySelector('.chrackInfo');
      const doc3 = document.querySelector('.divLoad');

      const query1 = <HTMLDivElement>doc1;
      const query2 = <HTMLDivElement>doc2;
      const query3 = <HTMLDivElement>doc3;

      query1.style.opacity = "0.0";
      query2.style.opacity = "0.0";
      query3.style.display = "block";
 

      //Get image using observable___________________________________________________________________
      this.obersavleImage = this.http.get(this.array[num][2], { responseType: 'blob' });


      setTimeout(() => {

        this.srcImage = "";
 

        this.numStayCharact = num;
        this.nameCharacter = this.array[this.numStayCharact][3];
        this.characterInfo = this.array[this.numStayCharact][4];
        this.arrayCharacteristics = this.array[this.numStayCharact][5];

        query1.style.opacity = "1";
        query2.style.opacity = "1";


        //Subscription to get blob image__________________________________________________________
        this.subscription = this.obersavleImage.subscribe((data: any) => {
      
          //convert Blob to image temporary url______________________________________
          var image = this.dom.bypassSecurityTrustUrl(URL.createObjectURL(data));

    
          query3.style.display = "none";

          setTimeout(() => {
            this.conditionShowCharact = true;
            this.srcImage = image;
            document.getElementById(query)?.scrollIntoView();
          }, 200);

          this.subscription.unsubscribe();
  
        });
        
        document.getElementById(query)?.scrollIntoView();
      }, 200);
    } 
  }

  //Homapge ICON________________________________________________________________________
  clickHIcon(numH: number){
    var query = <HTMLDivElement>document.querySelector('.ImgIH'+this.numHome);
    var query2 = <HTMLDivElement>document.querySelector('.ImgIH'+numH);
    if(numH != this.numHome){

      query.style.transition = "all ease-in 0.2s";
      query2.style.transition = "all ease-in 0.2s";
      
      query2.style.width = "110px";
      query2.style.height = "110px";

      query.style.width = "97px";
      query.style.height = "97px";


      this.numHome = numH;
      this.stLink = this.dom.bypassSecurityTrustResourceUrl(this.arrayH[this.numHome][1]+this.controls);
    }
  } 

  //Selection Relations_____________________________________________________________________
  RSbttn(numRS: number, query: string){
    this.arrayTempoS = this.arrayFinalS[numRS];
    document.getElementById(query)?.scrollIntoView();
  }


  //Mouse over and mouse out_____________________________________________________
  RSoverOut(numRS: number, condition: boolean){
    const query = <HTMLDivElement>document.querySelector('.divEp'+numRS);
    query.style.transition = "all ease-in 0.2s";

    
    if(condition){
      query.style.opacity = "1";
    }else{
      query.style.opacity = "0.0";
    }
  }



  naviClicked(query: string){
    document.getElementById(query)?.scrollIntoView();
  }

}
