# BJ_MACD_v2Study
# A customised MACD indicator.
# By Bharath Jayaram
# Last Update 23 Aug 2013

declare lower;

input fastLength = 3;
input slowLength = 10;
input MACDLength = 15;
input AverageType = {SMA, default EMA};

plot Value;
def Avg;
switch (AverageType) {
case SMA:
    Value = Average(close, fastLength) - Average(close, slowLength);
    Avg = Average(Value, MACDLength);
case EMA:
    Value = ExpAverage(close, fastLength) - ExpAverage(close, slowLength);
    Avg = ExpAverage(Value, MACDLength);
}


#Avg.AssignValueColor(if Avg > Avg[1] then color.white else (if Avg == Avg[1] then color.white else color.magenta));
#Avg.SetLineWeight(2);

plot Diff = Value - Avg;
plot ZeroLine = 0;

#Value.SetDefaultColor(GetColor(1));
#Avg.SetDefaultColor(GetColor(8));

Diff.AssignValueColor(if DIFF > DIFF[1] then color.green else (if DIFF == DIFF[1] then color.green else color.red));
Diff.SetLineWeight(2);

ZeroLine.SetDefaultColor(GetColor(1));
