<template>
    <div class="calendar">
        <div class="swiper-container">
        <div class="calendar-tools" >
            <div class="calendar-info">
                <div class="month">
                    <div class="month-inner" :style="{'top':-(this.month*3.15)+'em'}">
                        <span v-for="m in months">{{m}}</span>
                    </div>
                </div>
                <div class="year">{{year}}年</div>
            </div>
        </div>
        <div>
            <table cellpadding="5">
                <thead>
                <tr>
                    <td v-for="week in weeks" class="week">{{week}}</td>
                </tr>
                </thead>
            </table>
        </div>
            <div class="swiper-wrapper">
                <div v-for="n in totalMonth" class="swiper-slide">
                    <table cellpadding="5">
                        <tbody>
                        <tr v-for="(day,k1) in days" style="{'animation-delay',(k1*30)+'ms'}">
                            <td v-for="(child,k2) in day" :class="{'selected':child.selected,'disabled':child.disabled,'select2wait':child.select2wait,'rightDay':child.rightDay,'isToday':child.isToday}" @click="select(k1,k2,$event)">
                                <span >{{child.day}}</span>
                                <div class="text" v-if="child.eventName!=undefined">{{child.eventName}}</div>
                                <div class="text" :class="{'isLunarFestival':child.isLunarFestival,'isGregorianFestival':child.isGregorianFestival}" v-if="lunar">{{child.lunar}}</div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import calendar from '@/utils/calendar.js'
export default {
    props: {
        // 一共显示多少个月
        totalMonth:{
            type:Number,
            default:1
        },
        // 默认日期
        value: {
            type: Array,
            default: function(){
                return []
            }
        },
        values: {
            type: Array,
            default: function(){
                return []
            }
        },
        // 是否小于10补零
        zero:{
            type: Boolean,
            default: false
        },
        // 屏蔽的日期
        disabled:{
            type: Array,
            default: function(){
                return []
            }
        },
        // 是否显示农历
        lunar: {
            type: Boolean,
            default: true
        },

        // 自定义星期名称
        weeks: {
            type: Array,
            default:function(){
                return window.navigator.language.toLowerCase() == "zh-cn"?['日', '一', '二', '三', '四', '五', '六']:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            }
        },
        // 自定义月份
        months:{
            type: Array,
            default:function(){
                return window.navigator.language.toLowerCase() == "zh-cn"?['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            }
        },
        // 自定义事件
        events:  {
            type: Object,
            default: function(){
                return {}
            }
        },
    },
    data() {
        return {
            years:[],
            yearsShow:false,
            year: 0,
            month: 0,
            day: 0,
            days: [],
            nextDays:[],
            nnextDays:[],
            multiDays:[],
            allowPrev:false,
            allowNext:true,
            today: [],
            festival:{
                lunar:{
                    "1-1":"春节",
                    "1-15":"元宵节",
                    "2-2":"龙头节",
                    "5-5":"端午节",
                    "7-7":"七夕节",
                    "7-15":"中元节",
                    "8-15":"中秋节",
                    "9-9":"重阳节",
                    "10-1":"寒衣节",
                    "10-15":"下元节",
                    "12-8":"腊八节",
                    "12-23":"祭灶节",
                },
                gregorian:{
                    "1-1":"元旦",
                    "2-14":"情人节",
                    "3-8":"妇女节",
                    "3-12":"植树节",
                    "4-5":"清明节",
                    "5-1":"劳动节",
                    "5-4":"青年节",
                    "6-1":"儿童节",
                    "7-1":"建党节",
                    "8-1":"建军节",
                    "9-10":"教师节",
                    "10-1":"国庆节",
                    "12-24":"平安夜",
                    "12-25":"圣诞节",
                },
            },
            rangeBegin:[],
            rangeEnd:[],
            swiperOwn:''
        }
    },
    watch:{
        events(){
            this.days=this.render(this.year,this.month)
        },
        values(){
            this.init();
        },
    },
    mounted() {
        this.init();
        this.initSwiper();
    },
    methods: {
        initSwiper(){
            let that = this;
            let mySwiper = new Swiper('.swiper-container', {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                freeMode : false,
                observer:true,
                on:{
                    slideNextTransitionStart: function(){
                        if(that.allowNext){
                            that.next();
                        }
                        if(this.isEnd){
                            that.allowNext=false;
                        }
                        that.allowPrev=true;
                    },
                    slidePrevTransitionStart: function(){
                        if(that.allowPrev){
                            that.prev();
                        }
                        if(this.isBeginning){
                            that.allowPrev=false;
                        }
                        that.allowNext=true;
                    },
                },
            });
            that.swiperOwn=mySwiper;
        },
        init(){
            let now = new Date();
            this.year = now.getFullYear()
            this.month = now.getMonth()
            this.day = now.getDate()
            if (this.value.length>0) {
                console.info('单选')
                this.year = parseInt(this.value[0])
                this.month = parseInt(this.value[1]) - 1
                this.day = parseInt(this.value[2])
            }

            this.days=this.render(this.year, this.month);
        },
        // 渲染日期
        render(y, m) {
            let firstDayOfMonth = new Date(y, m, 1).getDay()         //当月第一天
            let lastDateOfMonth = new Date(y, m + 1, 0).getDate()    //当月最后一天
            let lastDayOfLastMonth = new Date(y, m, 0).getDate()     //最后一月的最后一天
            this.year = y
            let seletSplitS = this.values;
            let seletSplit = this.value;
            let i, line = 0,temp = [],nextMonthPushDays = 1
            let chk = new Date()
            let chkY = chk.getFullYear()
            let chkM = chk.getMonth()
            for (i = 1; i <= lastDateOfMonth; i++) {
                let day = new Date(y, m, i).getDay() //返回星期几（0～6）
                let k
                // 第一行
                if (day == 0) {
                    temp[line] = []
                } else if (i == 1) {
                    temp[line] = []
                    k = lastDayOfLastMonth - firstDayOfMonth + 1
                    for (let j = 0; j < firstDayOfMonth; j++) {
                        // console.log("第一行",lunarYear,lunarMonth,lunarValue,lunarInfo)
                        temp[line].push(Object.assign(
                            {day: k,disabled: true},
                            this.getLunarInfo(this.computedPrevYear(),this.computedPrevMonth(true),k),
                            this.getEvents(this.computedPrevYear(),this.computedPrevMonth(true),k),
                        ))
                        k++;
                    }
                }
                // selected 表示选中 isToday 表示今天 rightDay 表示到期
                let options;
                //如果有想选中的一天 就选中那天  否则就选今天
                if(this.value.length>0){
                  if(seletSplit[0] == this.year && (seletSplit[1]-1) == this.month && i == seletSplit[2]){
                    options= Object.assign(
                      {day: i,selected:false,isToday:true},
                      this.getLunarInfo(this.year,this.month+1,i),
                      this.getEvents(this.year,this.month+1,i),
                    )
                  }else {
                    options = Object.assign(
                      {day: i, selected: false},
                      this.getLunarInfo(this.year, this.month + 1, i),
                      this.getEvents(this.year, this.month + 1, i),
                    )
                  }
                }else{
                  if(chkY == this.year && chkM == this.month && i == this.day){
                    options= Object.assign(
                      {day: i,selected:false,isToday:true},
                      this.getLunarInfo(this.year,this.month+1,i),
                      this.getEvents(this.year,this.month+1,i),
                    )
                  }else {
                    options = Object.assign(
                      {day: i, selected: false},
                      this.getLunarInfo(this.year, this.month + 1, i),
                      this.getEvents(this.year, this.month + 1, i),
                    )
                  }
                }
                temp[line].push(options)
                // this.today 就是要选中的那天
                // 匹配选中的日期  循环要选中的时间 如果是那个时间 就把select变成true
                for(let j=0;j<seletSplitS.length;j++){
                    if (parseInt(seletSplitS[j][0]) == this.year && parseInt(seletSplitS[j][1]) - 1 == this.month && parseInt(seletSplitS[j][2]) == i) {
                        // 选中相应的天
                        for(let item of temp[line]){
                            if(item.day==i){
                                item.rightDay=true;
                            }
                        }
                        for(let item2 of temp[0]){
                            if(item2.day==1){
                                item2.selected=false;
                            }
                        }
                    }
                }
                // 到周六换行
                if (day == 6 && i < lastDateOfMonth) {
                    line++
                }else if (i == lastDateOfMonth) {
                    // line++
                    let k = 1
                    for (let d=day; d < 6; d++) {
                         // console.log(this.computedNextYear()+"-"+this.computedNextMonth(true)+"-"+k)
                        temp[line].push(Object.assign(
                            {day: k,disabled: true},
                            this.getLunarInfo(this.computedNextYear(),this.computedNextMonth(true),k),
                            this.getEvents(this.computedNextYear(),this.computedNextMonth(true),k),
                        ))
                        k++
                    }
                    // 下个月除了补充的前几天开始的日期
                    nextMonthPushDays=k
                }
            } //end for

            // console.log(this.year+"/"+this.month+"/"+this.day+":"+line)
            // 补充第六行让视觉稳定
            if(line<=5 && nextMonthPushDays>0){
                // console.log({nextMonthPushDays:nextMonthPushDays,line:line})
                for (let i = line+1; i<=5; i++) {
                    temp[i] = []
                    let start=nextMonthPushDays+(i-line-1)*7
                    for (let d=start; d <= start+6; d++) {
                        temp[i].push(Object.assign(
                            {day: d,disabled: true},
                            this.getLunarInfo(this.computedNextYear(),this.computedNextMonth(true),d),
                            this.getEvents(this.computedNextYear(),this.computedNextMonth(true),d),
                        ))
                    }
                }
            }
            return temp;
        },
        computedPrevYear(){
            let value=this.year
            if(this.month-1<0){
                value--
            }
            return value
        },
        computedPrevMonth(isString){
            let value=this.month
            if(this.month-1<0){
                value=11
            }else{
                value--
            }
            // 用于显示目的（一般月份是从0开始的）
            if(isString){
                return value+1
            }
            return value
        },
        computedNextYear(){
            let value=this.year
            if(this.month+1>11){
                value++
            }
            return value
        },
        computedNextMonth(isString){
            let value=this.month
            if(this.month+1>11){
                value=0
            }else{
                value++
            }
            // 用于显示目的（一般月份是从0开始的）
            if(isString){
                return value+1
            }
            return value
        },
        // 获取农历信息
        getLunarInfo(y,m,d){
            let lunarInfo=calendar.solar2lunar(y,m,d)
            let lunarValue=lunarInfo.IDayCn
            // console.log(lunarInfo)
            let isLunarFestival=false
            let isGregorianFestival=false
            if(this.festival.lunar[lunarInfo.lMonth+"-"+lunarInfo.lDay]!=undefined){
                lunarValue=this.festival.lunar[lunarInfo.lMonth+"-"+lunarInfo.lDay]
                isLunarFestival=true
            }else if(this.festival.gregorian[m+"-"+d]!=undefined){
                lunarValue=this.festival.gregorian[m+"-"+d]
                isGregorianFestival=true
            }
            return {
                lunar:lunarValue,
                isLunarFestival:isLunarFestival,
                isGregorianFestival:isGregorianFestival,
            }
        },
        // 获取自定义事件
        getEvents(y,m,d){
            if(Object.keys(this.events).length==0)return false;
            let eventName=this.events[y+"-"+m+"-"+d]
            let data={}
            if(eventName!=undefined){
                data.eventName=eventName
            }
            return data
        },
        // 上月
        prev(e) {
//            e.stopPropagation()
            if (this.month == 0) {
                this.month = 11
                this.year = parseInt(this.year) - 1
            } else {
                this.month = parseInt(this.month) - 1
            }
            this.days=this.render(this.year, this.month)
            this.$emit('selectMonth',this.month+1,this.year)
            this.$emit('prev',this.month+1,this.year)
        },
        //  下月
        next(e) {
//            e.stopPropagation()
            if (this.month == 11) {
                this.month = 0
                this.year = parseInt(this.year) + 1
            } else {
                this.month = parseInt(this.month) + 1
            }
            this.days=this.render(this.year, this.month)
            this.$emit('selectMonth',this.month+1,this.year)
            this.$emit('next',this.month+1,this.year)
        },
        // 选中日期
        select(k1, k2, e) {
            if (e != undefined) e.stopPropagation()
                // 日期范围
                // 取消上次选中
            this.unselectAll();
            // 设置当前选中天
            this.days[k1][k2].selected = true
            if(this.days[k1][k2].rightDay!=undefined){
                this.days[k1][k2].rightDay=false
            }
            if(this.days[k1][k2].isToday!=undefined){
                this.days[k1][k2].isToday=false
            }
            this.$emit('select',[this.year,this.zero?this.zeroPad(this.month + 1):this.month + 1,this.zero?this.zeroPad(this.days[k1][k2].day):this.days[k1][k2].day])
        },
        unselectAll(){
            this.days.forEach(v=>{
                v.forEach(vv=>{
                    vv.selected= false
                    if(vv.rightDay!=undefined){
                        vv.rightDay=true
                    }
                    if(vv.isToday!=undefined){
                        vv.isToday=true
                    }
                })
            })
        },
        // 日期补零
        zeroPad(n){
            return String(n < 10 ? '0' + n : n)
        },
    }
}

</script>

<style lang="scss" scoped>
  .calendar {
    width: 300px;
    min-width:300px;
    min-height:400px;
    background: #f7f7f7;
    font-family: "PingFang SC","Hiragino Sans GB","STHeiti","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    user-select:none;
    padding: 10px;
    margin-bottom: 20px;
  }

  .calendar-tools{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .calendar-info{
    line-height: 1.3;
    display: flex;
    color:#333;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 15px;
  }
  .calendar-info>div.month{
    height:2.5em;
    width:12em;
    color:#333;
    overflow: hidden;
    position: relative;
  }
  .calendar-info>div.month .month-inner{
    position: absolute;
    left:0;
    top:0;
    transition:top .5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .calendar-info>div.month .month-inner>span{
    display: block;
    font-size: 2.5em;
    font-weight: bold;
    height:1.5em;
    width:6em;
    overflow: hidden;
    text-align: center;
  }
  .calendar-info>div.year{
    font-size:2.5em;
    font-weight: bold;
    color:#333;
  }


  .calendar table {
    clear: both;
    width: 100%;
    margin-bottom:10px;
    border-collapse: collapse;
  }
  .calendar td {
    margin:2px !important;
    padding:0px 0;
    width: 14.28571429%;
    height:44px;
    text-align: center;
    vertical-align: middle;
    line-height: 125%;
    cursor: pointer;
    position: relative;
    vertical-align: top;
  }
  .calendar td.week{
    font-size:1.5em;
    color: #999982;
    font-weight:bold;
    pointer-events:none !important;
    cursor: default !important;
  }
  .calendar td.disabled {
    pointer-events:none !important;
    cursor: default !important;
  }
  .calendar td.disabled div{
    color: #e5e5e5;
  }
  .calendar td.disabled span{
    color: #cbcbcb;
  }
  .calendar td span{
    display:block;
    max-width:30px;
    height:30px;
    font-size: 15px;
    line-height:30px;
    margin:0px auto;
    border-radius:50%;
    color: #5f5f5f;
  }
  .calendar td:not(.selected) span:not(.red):hover{
    background:#ea6151;
    color:#444;
  }
  .calendar td:not(.selected) span.red:hover{
    background:#f9efef;
  }

  .calendar td:not(.disabled) span.red{
    color:#ea6151;
  }
  .calendar td.selected span{
    background-color: orange;
    color: #fff;
  }
  .calendar td.rightDay span{
    color: orange;
    border: 1px solid orange;
  }
  .calendar td.isToday span{
    background-color: #ccc;
    color: #fff;
  }
  .calendar td .text{
    position: absolute;
    top:28px;
    left:0;
    right:0;
    text-align: center;
    padding:2px;
    font-size:8px;
    line-height: 1.2;
    color: #ababab;
  }
  .calendar td .isGregorianFestival,
  .calendar td .isLunarFestival{
    color:#ea6151;
  }
  .calendar td.selected span.red{
    background-color: #ea6151;
    color: #fff;
  }
  .calendar td.selected span.red:hover{
    background-color: #ea6151;
    color: #fff;
  }
  .calendar td.select2wait span{
    background-color: #fff;
    color: red;
  }
  .calendar thead td {
    text-transform: uppercase;
    height:30px;
    vertical-align: middle;
  }
  .calendar-button{
    text-align: center;
  }
  .calendar-button span{
    cursor: pointer;
    display: inline-block;
    min-height: 1em;
    min-width: 5em;
    vertical-align: baseline;
    background:#5e7a88;
    color:#fff;
    margin: 0 .25em 0 0;
    padding: .6em 2em;
    font-size: 1em;
    line-height: 1em;
    text-align: center;
    border-radius: .3em;
  }
  .calendar-button span.cancel{
    background:#efefef;
    color:#666;
  }
  .calendar-years{
    position: absolute;
    left:0px;
    top:55px;
    right:0px;
    height: 370px;
    /*bottom:0px;*/
    background:#fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap:wrap;
    overflow: auto;
    transition:all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    z-index: 20;
    background-color: #ffff;
  }
  .calendar-years.show{
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0px);
  }
  .calendar-years>span{
    margin:1px 5px;
    display: inline-block;
    width:60px;
    line-height: 30px;
    border-radius: 20px;
    text-align:center;
    border:1px solid #fbfbfb;
    color:#999;
  }
  .calendar-years>span.active{
    border:1px solid #5e7a88;
    background-color: #5e7a88;
    color:#fff;
  }
</style>
