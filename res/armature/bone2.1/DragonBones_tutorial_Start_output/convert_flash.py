#coding:utf-8

"""
将flash资源中的图片打包，xml文件修改名字
created by mouzi
modified by reedhong
"""
from  xml.dom import  minidom
import sys
import os

import biplist
import json
import shutil
from PIL import Image

FALSH_ART = "flash_art"
FLASH_CONVERT = "flash"

def resize_png(src_file,dest_file, scale=0.5):
    print "resize_png ", src_file
    img = Image.open(src_file)
    width = int(img.size[0]*scale)
    if width == 0:
        width = 1
    height = int(img.size[1]*scale)
    if height == 0:
        height = 1
    new_image = img.resize((width, height), Image.BILINEAR)
    #import pdb;pdb.set_trace()
    new_image.save(dest_file)
    

def remove_updatainfo(plist_file):
    print "remove_updatainfo: %s"%(plist_file)
    lines = []
    plist = open(plist_file, "r")
    for line in plist.readlines():
        if line.strip() == "<key>smartupdate</key>":
            print line
            continue
        if line.lstrip().startswith("<string>$TexturePacker:SmartUpdate:"):
            print line
            continue
        lines.append(line)
    plist.close()
    plist = open(plist_file, "wb")
    plist.write("".join(lines))
    plist.close()

def resize_xml(src_file, des_file, scale):
	print "resize_xml ", src_file
	x="x"
	y="y"
	cc_x="cocos2d_x"
	cc_y="cocos2d_y"

	
	skel="skeleton"
	# segone
	armatures="armatures"
	armature="armature"
	b="b"
	
	#segtwo
	animations="animations"
	animation="animation"
	mov="mov"
	b1="b"
	f="f"
	
	doc = minidom.parse(src_file)
	#get the root element
	#handle segone
	root = doc.documentElement
	arouter=root.getElementsByTagName(armatures)[0]
	arinner=arouter.getElementsByTagName(armature)[0]
	bnodes=arinner.getElementsByTagName(b)
	for bnode in bnodes:
		xvalue=bnode.getAttribute(x)
		yvalue=bnode.getAttribute(y)
		bnode.setAttribute(x,str(float(xvalue)*scale))
		bnode.setAttribute(y,str(float(yvalue)*scale))
	#handle segtwo
	anouter=root.getElementsByTagName(animations)[0]
	aninner=anouter.getElementsByTagName(animation)[0]
	movnodes=aninner.getElementsByTagName(mov)
	for movnode in movnodes:
		b1nodes=movnode.getElementsByTagName(b1)
		for b1node in b1nodes:
			fnodes=b1node.getElementsByTagName(f)
			#print "hhe"
			for fnode in fnodes:
				cc_x_value=fnode.getAttribute(cc_x)
				cc_y_value=fnode.getAttribute(cc_y)
				##import pdb 
				#pdb.set_trace() 
				#print cc_x_value
				#print cc_y_value
				if len(cc_x_value)>0:
					fnode.setAttribute(cc_x,str(float(cc_x_value)*scale))
					fnode.setAttribute(cc_y,str(float(cc_y_value)*scale))
				

	destf = file(des_file,'wb')
	try:
		doc.writexml(destf,encoding='utf-8')
	except UnicodeEncodeError,ex:
		print "Fuck U, !!!!!!!!!!!!!!!!has chinese , Error encode xml %s"%src_file
		sys.exit(0)
		
def resize_plist(art_dir, armature_name, design_size, scale):
	flash_texture_dir  = os.path.join(art_dir, "%s_output/texture"%(armature_name))
	print "flash_texture_dir:%s, item = %s"%(flash_texture_dir, armature_name)
	temp_plist_dir = os.path.join(art_dir, "../Backup")
	if not os.path.isdir(temp_plist_dir):
		os.mkdir(temp_plist_dir)
	temp_texture_dir = os.path.join(temp_plist_dir, "texture")
	if os.path.isdir(temp_texture_dir):
		shutil.rmtree(temp_texture_dir)	
	os.mkdir(temp_texture_dir)
	
	for item in os.listdir(flash_texture_dir):
		old_texture = os.path.join(flash_texture_dir, item)
		new_texture = os.path.join(temp_texture_dir, item)
		resize_png(old_texture, new_texture, scale)
	resize_plist_image(armature_name, temp_plist_dir, design_size)
	

def resize_plist_image(armature_name, plist_dir, design_size):
	plist_file = os.path.join(plist_dir, "%s.plist"%(armature_name))
	if os.name=="nt":
		sheet_file = os.path.join(plist_dir, "%s.png"%(armature_name))
	else:
		sheet_file = os.path.join(plist_dir, "%s.pvr.ccz"%(armature_name))
	texture = os.path.join(plist_dir, "texture")
	tpcmd = "TexturePacker --data %s  --sheet %s %s" %(plist_file, sheet_file, texture)
	print tpcmd
	ret = os.system(tpcmd)
	if ret != 0:
		sys.exit(1)
	dest_flash_dir = os.path.join("../", design_size, FLASH_CONVERT)
	shutil.copy2(plist_file, dest_flash_dir)
	shutil.copy2(sheet_file, dest_flash_dir)	


def resize_flash(art_dir, convert_dir, armature_name, design_size, scale):
	cwd_path = os.getcwd()
	
	flash_xml_file = os.path.join(convert_dir, "%s.xml"%(armature_name))
	resize_flash_dir = os.path.join(cwd_path, "../", design_size, FLASH_CONVERT)
	if not os.path.isdir(resize_flash_dir):
		os.mkdir(resize_flash_dir)
	resize_xml(flash_xml_file, os.path.join(resize_flash_dir, "%s.xml"%(armature_name)), scale)
	resize_plist(art_dir, armature_name, design_size, scale)

def convert_all(art_dir, convert_dir):
	for sf in os.listdir(art_dir):
		subpath=os.path.normpath(os.path.join(art_dir,sf))
		if not os.path.isdir(subpath):
			continue
		convert_armature(art_dir, convert_dir, sf)

		
def convert_armature(art_dir, convert_dir, name):
	subpath = os.path.join(art_dir, name)
	for ssf in os.listdir(subpath):
		ssfpath=os.path.normpath(os.path.join(subpath,ssf))
		if os.path.isfile(ssfpath) and ssf.endswith(".xml"):
			armature_name=handle_xml(ssfpath, convert_dir)
			plist_image(armature_name, subpath, convert_dir)
			resize_flash(art_dir, convert_dir, armature_name, "960x640", 0.5)
			resize_flash(art_dir, convert_dir, armature_name, "480x320", 0.25)

def plist_image(armature_name, subpath, convert_dir):
	plist_file = os.path.join(convert_dir, "%s.plist"%(armature_name))
	sheet_file = os.path.join(convert_dir, "%s.png"%(armature_name))
	texture = os.path.join(subpath, "texture")
	tpcmd = "TexturePacker --data %s  --sheet %s %s" %(plist_file, sheet_file, texture)
	print tpcmd
	ret = os.system(tpcmd)
	if ret != 0:
		sys.exit(1)
	remove_updatainfo(plist_file)
	
def handle_xml(xml, dest_dir):
	doc = minidom.parse(xml)
	root = doc.documentElement
	armature_name=root.getAttribute("name")
	dest_file =os.path.normpath(os.path.join(dest_dir,"%s.xml"%(armature_name)))
	shutil.copyfile(xml, dest_file)
	return armature_name


if __name__ == "__main__":
	if (len(sys.argv) == 2):
		if sys.argv[1] == "all":
			convert_all(FALSH_ART, FLASH_CONVERT)
		else:
			convert_armature(FALSH_ART, FLASH_CONVERT,  sys.argv[1])
	else:
		print "usage %s baise_output|**_out|all"% sys.argv[0]
		
		
	#handle_flash_dir()