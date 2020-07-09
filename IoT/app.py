import requests as req
import json
from tkinter import *

URL = "http://localhost:5000"
res = req.get(f'{URL}/api')

data = json.loads(res.text)

path = list(map(lambda x: x["path"], data)) # ['clm', 'eng', 'ict', 'op', 'pky', 'safa', 'sci', 'ub']

def patch_increment(option):
    path = var.get()
    payload = json.dumps({option: 1})
    req.patch(f'{URL}/api/patch/{path}', data={"options": payload})

def patch_decrement(option):
    path = var.get()
    payload = json.dumps({option: -1})
    
    req.patch(f'{URL}/api/patch/{path}', data={"options": payload})

def sel():
    label.configure(text=f"Current Location: {var.get()}")

# GUI
root = Tk()

var = StringVar()

root.title("Raspberry Pi Simulator App")
root.geometry('320x250')
root.minsize(300,  250)

Label(root, text="Choose Location").grid(column=0, row=0)
for i in path:
    Radiobutton(root, text=i, variable=var, value=i, command=sel).grid(column=0, sticky=W)

Label(root, text="Car In").grid(column=1, row=0)
Button(root, text="Car Detected", command=lambda: patch_increment('carIn')).grid(column=1, row=1)


Label(root, text="Car Out").grid(column=1, row=3)
Button(root, text="Car Detected", command=lambda: patch_increment('carOut')).grid(column=1, row=4)

label = Label(root, text=f"Current Location:{var.get()}")

label.grid(column=1, row=6, columnspan=2, sticky=W)

# Debugger

#
Label(root, text="debug").grid(column=2, row=0, padx=50)
#

Button(root, text="Decrement", command=lambda: patch_decrement('carIn')).grid(column=2, row=1)
Button(root, text="Decrement", command=lambda: patch_decrement('carOut')).grid(column=2, row=4)





root.mainloop()