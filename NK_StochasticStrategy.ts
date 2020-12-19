input kPeriod = 14;
input slow_period = 3;
input fast_period = 1;
input over_bought = 80;
input over_sold = 20;
input trade_size = 100;
input averageType = AverageType.SIMPLE;

#Seconds after Mkt Open
def timeafterOpen = (GetTime() - RegularTradingStart(GetYYYYMMDD()))/1000;
#Seconds till MktClose
def timeToMktClose = (RegularTradingEnd(GetYYYYMMDD()) - GetTime())/1000; 

def stochSlow = reference StochasticFull("k period" = kPeriod, "price h" = high, "price l" = low, "price c" = close, "slowing period" = slow_period, "average type" = averageType).FullK;


def stochFast = reference StochasticFull("k period" = kPeriod, "price h" = high, "price l" = low, "price c" = close, "slowing period" = fast_period, "average type" = averageType).FullK;

def longEntry =  stochSlow < over_sold and stochFast < over_sold and timeafterOpen > 1800 and timetoMktClose > 900 ;# and stochSlow crosses above over_sold ; #and ;

AddOrder(OrderType.BUY_AUTO, longEntry, open[-1], trade_size, Color.GREEN, Color.GREEN, "Stoch Crossover Long @ " + open[-1]);

#Close positions if Profit Target or Stop Loss or if 2 mins to MArket close
def longExit_Profit = (close > EntryPrice() * 1.005 or timetoMktClose < 120);
def longExit_StpLos = (close < EntryPrice() * 0.9975 or timetoMktClose < 120);

AddOrder(OrderType.SELL_TO_CLOSE, longExit_Profit, open[-1], trade_size, Color.ORANGE, Color.ORANGE, "ProfitTgt @ " + open[-1]);
AddOrder(OrderType.SELL_TO_CLOSE, longExit_StpLos, open[-1], trade_size, Color.ORANGE, Color.ORANGE, "StopLoss @ " + open[-1]);

#AddOrder(OrderType.SELL_AUTO, fullK crosses below over_bought, tickColor = GetColor(6), arrowColor = GetColor(6), name = "StochasticSE");
#AddOrder(OrderType.BUY_TO_CLOSE, close > EntryPrice()*1.005 or close < EntryPrice()*0.9975);


#AddOrder(OrderType.BUY_AUTO, longEntry, close[1], tradeSize, Color.GREEN, Color.GREEN, "Stoch Crossover Long @ " + close);
#AddOrder(OrderType.SELL_TO_CLOSE, exitLong, close[1], tradeSize, Color.ORANGE, Color.ORANGE, "Stoch Crossover @ " + close);

#AddOrder(OrderType.SELL_AUTO, shortEntry, close[1], tradeSize, Color.ORANGE, Color.ORANGE, "BBLines Short @ " + close);
#AddOrder(OrderType.BUY_TO_CLOSE, exitShort, close[1], tradeSize, Color.GREEN, Color.GREEN, "BBLines Exit-Short @ " + close);