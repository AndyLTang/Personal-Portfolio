# Filename: catcss.sh
# Description: takes all css files in current directory and concatenates them to style.css
#              ignores external css (normalize.css)

# Do not include normalize in concatenation of css files
mv normalize.css normalize.css.tmp

# Concatenate all css files
cat *.css >> style.css

# Name normalize back to original
mv normalize.css.tmp normalize.css