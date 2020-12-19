# BJ_TrendStrengthIndicatorStudy
# White painted bars in the histogram means a choppy indecisive market 
# Look for crossover of the DMI(+) which is the BLUE line over the DMI(-) which is the WHITE line for confirming entry signals and only when they happen above the 20 threshold
# Stay in the trade as long as that particular DMI is above the threshold plotted.
# Use also the ADX line which determines the strength of the trend. Usually values of 0-25 means no trend. 25-50 is a good trend. 50-75 - Strong Trend. Above 75 - Something you will never see 
# By Bharath Jayaram
# Last Update 27 Dec 2014

declare lower;

input length = 10;
input weakLine = 20;
input strongLine = 40;
input diffDMILine = 8;

def hiDiff = high - high[1];
def loDiff = low[1] - low;
def plusDM = if hiDiff > loDiff and hiDiff > 0 then hiDiff else 0;
def minusDM =  if loDiff > hiDiff and loDiff > 0 then loDiff else 0;
def ATR = WildersAverage(TrueRange(high, close, low), length);
def diPlus = 100 * WildersAverage(plusDM, length) / ATR;
def diMinus = 100 * WildersAverage(minusDM, length) / ATR;
def DX = if (diPlus + diMinus > 0) then 100 * AbsValue(diPlus - diMinus) / (diPlus + diMinus) else 0;
def diDiff = diPlus - diMinus;


plot Hist = AbsValue(diDiff);
#plot Pos = diPlus;
#plot Neg = diMinus;
plot ZeroLine = 0;
plot TrendWeak = WeakLine;
plot TrendStrong = StrongLine;
plot ADX = WildersAverage(DX, length);


Hist.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Hist.SetLineWeight(4);
Hist.AssignValueColor(if (diPlus - diMinus) > 0 then Color.UPTICK else Color.DOWNTICK);
Hist.HideTitle();
ZeroLine.SetDefaultColor(Color.GRAY);
ADX.setDefaultColor(GetColor(1));
ADX.setlineWeight(2);
TrendStrong.SetDefaultColor(GetColor(4));
TrendStrong.setlineWeight(2);
TrendWeak.SetDefaultColor(GetColor(4));
TrendWeak.setlineWeight(2);








