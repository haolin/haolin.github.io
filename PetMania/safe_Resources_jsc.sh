
#jsc create
echo "start jsc create"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


if [ -d "$DIR"/jscResources ]; then
rm -rf "$DIR"/jscResources
fi

mkdir "$DIR"/jscResources

JSC_BINDINGS_JS_ROOT="$DIR/../Cocos2d-x_2.1.4/cocos2d-x-2.1.4/scripting/javascript/bindings/js"

cp -f "$JSC_BINDINGS_JS_ROOT"/*.js "$DIR"/jscResources

# copy resources
for file in "$DIR"/Resources/*
do
if [ -d "$file" ]; then
cp -rf "$file" "$DIR"/jscResources
fi

if [ -f "$file" ]; then
cp "$file" "$DIR"/jscResources
fi
done




APP_RESOURCES="$DIR/jscResources"
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
