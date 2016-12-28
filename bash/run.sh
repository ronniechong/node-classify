#!/bin/sh
IMGPATH="$1"
GRAPHNAME="$2"
#tensorflow/label_image/label_image --graph=tensoflow/graph/${GRAPHNAME}.pb --labels=tensorflow/graph/${GRAPHNAME}.txt --output_layer=final_result --image=${IMGPATH}
echo "{"
echo "\"image\":\"${IMGPATH}\","
echo "\"graph\":\"${GRAPHNAME}\""
echo "}"
