# BJ_HeikinAshiCandlestickOscillatorPriceBar
# By Bharath Jayaram
# Last Update 7 Jan 2015

input upTrendAvgPeriod = 34;
input downTrendAvgPeriod = 34;


rec haopen = compoundValue(1, ((open[1] + high[1] + low[1] + close[1]) / 4 + haopen[1]) / 2, hl2);
def haclose = ((open + high + low + close) / 4 + haopen + Max(high, haopen) + Min(low, haopen)) / 4;


def HATMA1 = 3 * ExpAverage(haclose, upTrendAvgPeriod)
- 3 * ExpAverage(ExpAverage(haclose, upTrendAvgPeriod), upTrendAvgPeriod)
+ ExpAverage(ExpAverage(ExpAverage(haclose, upTrendAvgPeriod), upTrendAvgPeriod), upTrendAvgPeriod);

def HATMA2 = 3 * ExpAverage(HATMA1, upTrendAvgPeriod)
- 3 * ExpAverage(ExpAverage(HATMA1, upTrendAvgPeriod), upTrendAvgPeriod)
+ ExpAverage(ExpAverage(ExpAverage(HATMA1, upTrendAvgPeriod), upTrendAvgPeriod), upTrendAvgPeriod);


def HAdifference = HATMA1 - HATMA2;
def ZlHA = HATMA1+HADifference;


def HLTMA1 = 3 * ExpAverage(hl2, upTrendAvgPeriod)
- 3 * ExpAverage(ExpAverage(hl2, upTrendAvgPeriod), upTrendAvgPeriod)
+ ExpAverage(ExpAverage(ExpAverage(hl2, upTrendAvgPeriod), upTrendAvgPeriod), upTrendAvgPeriod);

def HLTMA2 = 3 * ExpAverage(HLTMA1, upTrendAvgPeriod)
- 3 * ExpAverage(ExpAverage(HLTMA1, upTrendAvgPeriod), upTrendAvgPeriod)
+ ExpAverage(ExpAverage(ExpAverage(HLTMA1, upTrendAvgPeriod), upTrendAvgPeriod), upTrendAvgPeriod);


def HLdifference = HLTMA1 - HLTMA2;
def ZlCl = HLTMA1+HLDifference;
def ZlDif = ZlCl-ZlHA;


#def keep1 = if (haclose>=haopen and haclose[1]>=haopen[1]) then 1 else 0;
def keep1 = if (haclose>=haopen and haclose[1]>=haopen[1]) or if(close>=haclose,1,if(high>high[1] or low>low[1],1,0)) then 1 else 0;
def keep2 = if ZlDif>=0 then 1 else 0;
def keeping = if (keep1 or keep2) then 1 else 0;
def keepall = if keeping or (keeping[1] and close>=open or close >=close[1]) then 1 else 0;
def keep3 = if (absValue(close-open)<((high-low)*0.35)) and high>=low[1] then 1 else 0;

def utr = if keepall or (keepall[1] and keep3) then 1 else 0;



def dHATMA1 = 3 * ExpAverage(haclose, downTrendAvgPeriod)
- 3 * ExpAverage(ExpAverage(haclose, downTrendAvgPeriod), downTrendAvgPeriod)
+ ExpAverage(ExpAverage(ExpAverage(haclose, downTrendAvgPeriod), downTrendAvgPeriod), downTrendAvgPeriod);

def dHATMA2 = 3 * ExpAverage(dHATMA1, downTrendAvgPeriod)
- 3 * ExpAverage(ExpAverage(dHATMA1, downTrendAvgPeriod), downTrendAvgPeriod)
+ ExpAverage(ExpAverage(ExpAverage(dHATMA1, downTrendAvgPeriod), downTrendAvgPeriod), downTrendAvgPeriod);


def dHAdifference = dHATMA1 - dHATMA2;
def dZlHA = dHATMA1+dHADifference;


def dHLTMA1 = 3 * ExpAverage(hl2, downTrendAvgPeriod)
- 3 * ExpAverage(ExpAverage(hl2, downTrendAvgPeriod), downTrendAvgPeriod)
+ ExpAverage(ExpAverage(ExpAverage(hl2, downTrendAvgPeriod), downTrendAvgPeriod), downTrendAvgPeriod);
def dHLTMA2 = 3 * ExpAverage(dHLTMA1, downTrendAvgPeriod)
- 3 * ExpAverage(ExpAverage(dHLTMA1, downTrendAvgPeriod), downTrendAvgPeriod)
+ ExpAverage(ExpAverage(ExpAverage(dHLTMA1, downTrendAvgPeriod), downTrendAvgPeriod), downTrendAvgPeriod);


def dHLdifference = dHLTMA1 - dHLTMA2;
def dZlCl = dHLTMA1+dHLdifference;
def dZlDif = dZlCl-dZlHA;


def dkeep1 = if (haclose<haopen and haclose[1]<haopen[1]) then 1 else 0;
#def dkeep1 = if (haclose<haopen and haclose[1]<haopen[1]) or if(close<=haclose,1,if(high<high[1] or low<low[1],1,0)) then 1 else 0;
def dkeep2 = if dZlDif<0 then 1 else 0;
def dkeep3 = if (absValue(close-open)<((high-low)*0.35)) and low<=high[1] then 1 else 0;
def dkeeping = if (dkeep1 or dkeep2) then 1 else 0;
def dkeepall = if dkeeping or (dkeeping[1] and close<open or close <close[1]) then 1 else 0;

def dtr = if (dkeepall or (dkeepall[1] and dkeep3) , 1 , 0);


def upw = if !dtr and dtr[1] and utr then 1 else 0;
def dnw = if !utr and utr[1] and dtr then 1 else 0;

rec signal= if upw then 1 else if dnw then 0 else signal[1] ;

plot nullPlot = double.nan;
assignPriceColor(if signal then color.green else color.red);
