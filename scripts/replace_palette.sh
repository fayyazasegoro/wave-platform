#!/usr/bin/env bash
set -e

echo "Replacing old Tailwind color classes with new palette..."

# Gradient replacements
sed -i '' 's/bg-gradient-to-r from-teal-500 to-ocean-500/bg-gradient-to-r from-soft-pistachio to-soft-apricot/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/bg-gradient-to-r from-teal-400 to-ocean-500/bg-gradient-to-r from-soft-pistachio to-soft-apricot/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/bg-gradient-to-r from-teal-400 to-ocean-600/bg-gradient-to-r from-soft-pistachio to-soft-apricot/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/bg-gradient-to-r from-teal-500 to-ocean-600/bg-gradient-to-r from-soft-pistachio to-soft-apricot/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/bg-gradient-to-r from-teal-400 to-ocean-400/bg-gradient-to-r from-soft-pistachio to-soft-apricot/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")

# Single color replacements
sed -i '' 's/bg-teal-[0-9]\{2,3\}/bg-soft-pistachio/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/bg-ocean-[0-9]\{2,3\}/bg-soft-apricot/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/bg-navy-[0-9]\{2,3\}/bg-warm-ivory/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/text-navy-950/text-deep-sage/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/border-navy-[0-9]\{2,3\}/border-soft-pistachio/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")

sed -i '' 's/border-slate-[0-9]\{2,3\}/border-soft-pistachio/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/text-slate-[0-9]\{2,3\}/text-deep-sage/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/bg-slate-[0-9]\{2,3\}/bg-soft-pistachio/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")

# Accent color replacements
sed -i '' 's/bg-rose-[0-9]\{2,3\}/bg-soft-apricot/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/bg-amber-[0-9]\{2,3\}/bg-soft-apricot/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/bg-emerald-[0-9]\{2,3\}/bg-soft-pistachio/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/bg-cyan-[0-9]\{2,3\}/bg-soft-apricot/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/bg-indigo-[0-9]\{2,3\}/bg-muted-pistachio/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")

# Text accent replacements (if any)
sed -i '' 's/text-rose-[0-9]\{2,3\}/text-soft-apricot/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/text-amber-[0-9]\{2,3\}/text-soft-apricot/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/text-emerald-[0-9]\{2,3\}/text-soft-pistachio/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/text-cyan-[0-9]\{2,3\}/text-soft-apricot/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")
sed -i '' 's/text-indigo-[0-9]\{2,3\}/text-muted-pistachio/g' $(git ls-files "src/**/*.tsx" "src/**/*.ts" "src/**/*.jsx" "src/**/*.js")

echo "Replacement complete."
