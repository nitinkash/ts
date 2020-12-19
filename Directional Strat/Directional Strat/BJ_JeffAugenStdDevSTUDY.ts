# Tom Utley 3-17-2009
# Thanks to Jeff Augen
# Price Spikes in Standard Deviations
declare lower;
input length = 20;
input std_dev2 = 2;
input std_dev1 = 1;
def closeLog = Log(close[1] / close[2]);
def SDev = StDev(closeLog, length) * Sqrt(length / (length – 1));
def m = SDev * close[1];
plot spike = (close[0] – close[1]) / m;
spike.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
spike.AssignValueColor(if close > close[1] then Color.UPTICK else if close < close[1] then Color.DOWNTICK else GetColor(1));
plot s1 = std_dev1;
plot s2 = std_dev2;
plot zeroLine = 0;
plot s3 = -std_dev1;
plot s4 = -std_dev2;

s1.setDefaultColor(color.white);
s1.setDefaultColor(color.white);
zeroLine.setDefaultColor(color.white);
s3.setDefaultColor(color.white);
s4.setDefaultColor(color.white);

s1.setLineWeight(1);
s2.setLineWeight(2);
s3.setLineWeight(1);
s4.setLineWeight(2);