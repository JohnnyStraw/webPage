import librosa
import numpy as np
import librosa.display
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import sys


class HeartSound:


  xdata, ydata = [], []
  y=None
  sr=None
  x=[]
  i=0
  j=0

  def __init__(self):
    filename="D:/upload/WebstormProjects/imlost/upload/"+sys.argv[1]



    k=0
    self.y, self.sr = librosa.load(filename,duration=10)

    #self.y=librosa.resample(self.y,self.sr,2048)
    #self.sr = 2048


    while k<=len(self.y)/self.sr:
      self.x.append(k)
      k=k+1/self.sr


  def getNextTime(self):
    self.i=self.i+1
    return self.x[self.i]
  def getNextAmp(self):
    self.j=self.j+1
    return self.y[self.j]

#def update(frames):
 #   heartsound.xdata.append(frames)
  #  heartsound.ydata.append(heartsound.getNextAmp())

   # ln.set_data(heartsound.xdata, heartsound.ydata)

    #return ln,

#def init():
 #   ax.set_xlim(0, 3.2)
  #  ax.set_ylim(-1, 1)
   # return ln,
hs=HeartSound()
#fig, ax = plt.subplots()
#ln, = plt.plot([], [], 'ro', animated=True)
#ani = FuncAnimation(fig, update, frames=heartsound.x, interval=1,



                  # init_func=init, blit=True)
name=str(sys.argv[1])
name=name.replace(".mp3","")
y_harm, y_perc = librosa.effects.hpss(hs.y)
librosa.display.waveplot(y_harm, sr=hs.sr,)
librosa.display.waveplot(y_perc, sr=hs.sr, color='r', alpha=0.5)
plt.title('Harmonic and Percussive elements seperated')
plt.tight_layout()
plt.savefig("D:/upload/WebstormProjects/imlost/dist/assets/"+"img/"+name)

#plt.show()
