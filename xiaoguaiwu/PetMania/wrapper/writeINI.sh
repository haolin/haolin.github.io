#!/bin/bash
#
#
CONF_INI_FILE="conf.ini"

echo "[$prefix]" > $CONF_INI_FILE
# the prefix to be added to the generated functions. You might or might not use this in your own
# templates
echo "prefix = $prefix" >> $CONF_INI_FILE

# create a target namespace (in javascript, this would create some code like the equiv. to `ns = ns || {}`)
# all classes will be embedded in that namespace
echo "target_namespace = $jsclasses" >> $CONF_INI_FILE

echo "android_headers = -I%(androidndkdir)s/platforms/android-14/arch-arm/usr/include -I%(androidndkdir)s/sources/cxx-stl/gnu-libstdc++/4.6/libs/armeabi-v7a/include -I%(androidndkdir)s/sources/cxx-stl/gnu-libstdc++/4.6/include" >> $CONF_INI_FILE
echo "android_flags = -D_SIZE_T_DEFINED_" >> $CONF_INI_FILE

echo "clang_headers = -I%(clangllvmdir)s/lib/clang/3.1/include" >> $CONF_INI_FILE
echo "clang_flags = -nostdinc -x c++" >> $CONF_INI_FILE

echo "cocos_headers = -I%(cocosdir)s/cocos2dx/include -I%(cocosdir)s/cocos2dx/platform -I%(cocosdir)s/cocos2dx/platform/android -I%(cocosdir)s/cocos2dx -I%(cocosdir)s/cocos2dx/kazmath/include" >> $CONF_INI_FILE
echo "cocos_flags = -DANDROID -DCOCOS2D_JAVASCRIPT" >> $CONF_INI_FILE

echo "cxxgenerator_headers = -I%(cxxgeneratordir)s/targets/spidermonkey/common" >> $CONF_INI_FILE

# extra arguments for clang
echo "extra_arguments = %(android_headers)s %(clang_headers)s %(cxxgenerator_headers)s %(cocos_headers)s %(android_flags)s %(clang_flags)s %(cocos_flags)s %(extra_flags)s" >> $CONF_INI_FILE

# what headers to parse
echo "headers = $headers" >> $CONF_INI_FILE

# what classes to produce code for. You can use regular expressions here. When testing the regular
# expression, it will be enclosed in "^$", like this: "^CCMenu*$".

echo "classes = $classes" >> $CONF_INI_FILE

# what should we skip? in the format ClassName::[function function]
# ClassName is a regular expression, but will be used like this: "^ClassName$" functions are also
# regular expressions, they will not be surrounded by "^$". If you want to skip a whole class, just
# add a single "*" as functions. See bellow for several examples. A special class name is "*", which
# will apply to all class names. This is a convenience wildcard to be able to skip similar named
# functions from all classes.

echo "skip =" >> $CONF_INI_FILE

echo "rename_functions =" >> $CONF_INI_FILE

echo "rename_classes =" >> $CONF_INI_FILE

# for all class names, should we remove something when registering in the target VM?
echo "remove_prefix = CC" >> $CONF_INI_FILE

# classes for which there will be no "parent" lookup
echo "classes_have_no_parents = CCNode CCDirector SimpleAudioEngine CCFileUtils CCTMXMapInfo CCApplication" >> $CONF_INI_FILE

# base classes which will be skipped when their sub-classes found them.
echo "base_classes_to_skip = CCObject" >> $CONF_INI_FILE

# classes that create no constructor
# CCSet is special and we will use a hand-written constructor
echo "abstract_classes =" >> $CONF_INI_FILE

# Determining whether to use script object(js object) to control the lifecycle of native(cpp) object or the other way around. Supported values are 'yes' or 'no'.
echo "script_control_cpp = no" >> $CONF_INI_FILE