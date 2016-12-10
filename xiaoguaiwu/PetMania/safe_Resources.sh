
#jsc create
echo "start jsc create"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
APP_RESOURCES="$DIR/Resources/"
APP_TOOL="$DIR/Tool/"

function ergodic(){  
    for file in ` ls $1 `  
        do  
                if [ -d $1"/"$file ]  
                then  
                        ergodic $1"/"$file  
                else 
                    if [ "${file##*.}" = "js" ]
                    then
                        "$APP_TOOL/jsbcc" "$1/$file"
                        rm -f "$1/$file"
                    fi  
                fi  
    done  
}

ergodic $APP_RESOURCES
echo "end jsc"
