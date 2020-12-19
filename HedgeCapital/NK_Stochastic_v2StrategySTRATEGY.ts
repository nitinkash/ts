input over_bought = 80;
input over_sold = 20;
input KPeriod = 3;
input DPeriod = 3;
input priceH = high;
input priceL = low;
input priceC = close;
input slowing_period = 2;
input smoothingType = 1;
input trade_size = 100;

input length = 50;
input displace = 0;
def Trnd =  Average(close[-displace], length);

#Seconds after Mkt Open
def timeafterOpen = (GetTime() - RegularTradingStart(GetYYYYMMDD())) / 1000;
#Seconds till MktClose
def timeToMktClose = (RegularTradingEnd(GetYYYYMMDD()) - GetTime()) / 1000;

def c1 = priceC - Lowest(priceL, KPeriod);
def c2 = Highest(priceH, KPeriod) - Lowest(priceL, KPeriod);
def FastK = c1 / c2 * 100;


def FullK = Average(FastK, slowing_period);

def longEntry = FullK < over_sold and timeafterOpen > 1800 and timeToMktClose > 900 ;

AddOrder(OrderType.BUY_AUTO, longEntry, open[-1], trade_size, Color.GREEN, Color.GREEN, "V2Stoch Crossover Long @ " + open[-1]);

#Close positions if Profit Target or Stop Loss or if Indicator goes down or if 2 mins to MArket close
def longExit_Profit = (close > EntryPrice() * 1.005  or timeToMktClose < 120);
def longExit_StpLos = (close < EntryPrice() * 0.9975 or FullK < FullK[1] or timeToMktClose < 120);

AddOrder(OrderType.SELL_TO_CLOSE, longExit_Profit, open[-1], trade_size, Color.ORANGE, Color.ORANGE, "V2ProfitTgt @ " + open[-1]);
AddOrder(OrderType.SELL_TO_CLOSE, longExit_StpLos, open[-1], trade_size, Color.ORANGE, Color.ORANGE, "V2StopLoss @ " + open[-1]);

def shortEntry = FullK > over_bought and timeafterOpen > 1800 and timeToMktClose > 900 ;
AddOrder(OrderType.SELL_AUTO, shortEntry, open[-1], trade_size, GetColor(0), GetColor(0), "V2Stoch Crossover Short @ " + open[-1]);

def shortExit_Profit = (close < EntryPrice() * 1.005 or timeToMktClose < 120);
def shortExit_StpLos = (close > EntryPrice() * 0.9975 or FullK > FullK[1] or timeToMktClose < 120);


AddOrder(OrderType.BUY_TO_CLOSE, shortExit_Profit, open[-1], trade_size, Color.ORANGE, Color.ORANGE, "V2ProfitTgt @ " + open[-1]);
AddOrder(OrderType.BUY_TO_CLOSE, shortExit_StpLos, open[-1], trade_size, Color.ORANGE, Color.ORANGE, "V2StopLoss @ " + open[-1]);