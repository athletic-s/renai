'use strict';
const userNameInput=document.getElementById('user-name');
const otherNameinput=document.getElementById('other-name');
const go=document.getElementById('go');
const resultDivided=document.getElementById('result-area');
const tweetDivided=document.getElementById('tweet-area');

/**
 * 指定した要素の子要素を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while(element.firstChild){
        //子要素がある限り削除
        element.removeChild(element.firstChild);
    }
}
userNameInput.onkeydown=event=>{
    if(event.key==='Enter'){
        go.onclick();
    }
};
otherNameinput.onkeydown=event=>{
    if(event.key==='Enter'){
        go.onclick();
    }
};
go.onclick=()=>{
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //名前が空の時は処理を修了する

        return;
    }
    //診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '占い結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //TODO　ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue =
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('私の恋愛占い') + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #私の恋愛占い';
    tweetDivided.appendChild(anchor);

    //widgets.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);

};
const answers=[
'{userName}さんと{好きな人}さんの二人の相性は１００％です。{userName}さんと{好きな人}は今すぐに結ばれるべきでしょう。幸せな運命にあります。',
'{userName}さんと{好きな人}さんの二人の相性は９９％です。ほしい！！{userName}さんと{好きな人}はとても相性がいいです。{userName}さんは早く思いを伝えるべきでしょう。',
'{userName}さんと{好きな人}さんの二人の相性は９５％です。ほしい！{userName}さんと{好きな人}はとても相性がイイです。思いを伝えればきっとあなたの思いは届くでしょう。',
'{userName}さんと{好きな人}さんの二人の相性は９０％です。{userName}さんと{好きな人}は相性がとてもいいです。二人で楽しいことをすればもっと二人の距離は縮まるでしょう。',
'{userName}さんと{好きな人}さんの二人の相性は８０％です。',
'{userName}さんと{好きな人}さんの二人の相性は６５％です。',
'{userName}さんと{好きな人}さんの二人の相性は７６％です。',
'{userName}さんと{好きな人}さんの二人の相性は５０％です。',
'{userName}さんと{好きな人}さんの二人の相性は４０％です。',
'{userName}さんと{好きな人}さんの二人の相性は４５％です。',
'{userName}さんと{好きな人}さんの二人の相性は３０％です。',
'{userName}さんと{好きな人}さんの二人の相性は２５％です。',
'{userName}さんと{好きな人}さんの二人の相性は１０％です。',
'{userName}さんと{好きな人}さんの二人の相性は１５％です。',
'{userName}さんと{好きな人}さんの二人の相性は１００％です。{userName}さんと{好きな人}は今すぐに結ばれるべきでしょう。幸せな運命にあります。',
'{userName}さんと{好きな人}さんの二人の相性は５５％です。{userName}{好きな人}',
'{userName}さんと{好きな人}さんの二人の相性は９８％です。ほしい！{userName}さんは{好きな人}と、とても親密な関係を築けています。その調子で頑張りましょう。',
'{userName}さんと{好きな人}さんの二人の相性は８５％です。',
'{userName}さんと{好きな人}さんの二人の相性は６７％です。',
'{userName}さんと{好きな人}さんの二人の相性は１２０％です。',
'{userName}さんと{好きな人}さんの二人の相性は２００％です。ミラクル！{userName}さんは{好きな人}さんと永遠の時を一緒に過ごすべきでしょう。相性最高！',
'{userName}さんと{好きな人}さんの二人の相性は７８％です。',
'{userName}さんと{好きな人}さんの二人の相性は２００％です。',
'{userName}さんと{好きな人}さんの二人の相性は４９％です。',    
'{userName}さんと{好きな人}さんの二人の相性は２７％です。',
'{userName}さんと{好きな人}さんの二人の相性は３９％です。',
'{userName}さんと{好きな人}さんの二人の相性は８２％です。',
'{userName}さんと{好きな人}さんの二人の相性は１００％です。{userName}さんと{好きな人}は今すぐに結ばれるべきでしょう。幸せな運命にあります。',
'{userName}さんと{好きな人}さんの二人の相性は１００％です。{userName}さんと{好きな人}は今すぐに結ばれるべきでしょう。幸せな運命にあります。',
'{userName}さんと{好きな人}さんの二人の相性は２００％です。ミラクル！{userName}さんは{好きな人}さんと永遠の時を一緒に過ごすべきでしょう。相性最高！',
'{userName}さんと{好きな人}さんの二人の相性は１２０％です。素晴らしい！{userName}さんは{好きな人}とこの先ずっといっしょにいるべきパートナーです！',
'{userName}さんと{好きな人}さんの二人の相性は０％です。残念…{userName}さんは{好きな人}さんともっと話してお互いに理解を深めましょう。'   
    ];
    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} userName ユーザーの名前
     * @retuen {string} 診断結果
     */
    function assessment(userName){
        //全文字のコード番号を取得してそれを足し合わせる
        let sumOfCharCode=0;
        for(let i = 0;i< userName.length;i++){
            sumOfCharCode=sumOfCharCode+userName.charCodeAt(i);
        }
        const likeName= otherNameinput.value;
        let sum=0;
        for(let i=0;i<likeName.length;i++){
            sum=sum+likeName.charCodeAt(i);

        }
        //文字コード番号の合計を回答の数で割って添字の数値を求める
    
        const index =(sumOfCharCode+sum)%answers.length;
        let result=answers[index];
    
        result=result.replace(/\{userName\}/g, userName);
        result=result.replace(/\{好きな人\}/g, likeName);
        return result;
    }
    
    console.assert(
        assessment('太郎')===
        '太郎さんと{好きな人}さんの二人の相性は１００％です。太郎さんと{好きな人}は今すぐに結ばれるべきでしょう。幸せな運命にあります。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );
    console.assert(
        assessment('太郎')=== assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );
    


