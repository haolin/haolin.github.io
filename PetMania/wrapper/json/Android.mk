LOCAL_PATH := $(call my-dir)  
include $(CLEAR_VARS)  
  
LOCAL_MODULE    := jsoncpp_static  
  
LOCAL_MODULE_FILENAME := libjsoncpp  
  
LOCAL_CPPFLAGS :=  -fexceptions    
  
LOCAL_SRC_FILES := 	../json/json_reader.cpp \  
					../json/son_value.cpp \  
					../json/json_writer.cpp   
  
  
LOCAL_EXPORT_C_INCLUDES := $(LOCAL_PATH)/include/  
  
LOCAL_C_INCLUDES := $(LOCAL_PATH)/include/  
                          
include $(BUILD_STATIC_LIBRARY)  