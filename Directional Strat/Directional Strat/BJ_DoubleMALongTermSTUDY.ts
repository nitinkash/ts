# BJ_DoubleMALongTermStudy
# A double moving average which calculates the longer term average,
# BLUE - UpTrend & WHITE - DownTrend
# By Bharath Jayaram
# Last Update 27 Dec 2014

def displace = 0;
def MA1_length = 9;
def MA2_length = 9;
def price = close;

def data1 = compoundValue(1, hullMovingAvg(price[-displace], MA1_length), price);

plot DoubleMA;

DoubleMA = compoundValue(1, VariableMA( data1, MA2_length), data1);

DoubleMA.SetLineWeight(2);
DoubleMA.AssignValueColor(if DoubleMA > DoubleMA[1] then Color.BLUE else Color.white);
DoubleMA.HideBubble();
