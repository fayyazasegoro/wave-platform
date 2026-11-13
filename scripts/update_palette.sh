#!/usr/bin/env bash
set -e
# Replace old dark-theme Tailwind classes with Pistachio & Apricot palette
find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) | while read f; do
  sed -i '' \
    -e 's/bg-navy-950/bg-warm-ivory/g' \
    -e 's/bg-navy-900/bg-warm-ivory/g' \
    -e 's/bg-navy-850/bg-soft-pistachio/g' \
    -e 's/bg-navy-950\/80/bg-warm-ivory\/80/g' \
    -e 's/bg-navy-900\/80/bg-warm-ivory\/80/g' \
    -e 's/text-slate-100/text-deep-sage/g' \
    -e 's/text-slate-300/text-deep-sage/g' \
    -e 's/text-slate-200/text-deep-sage/g' \
    -e 's/text-slate-400/text-soft-pistachio/g' \
    -e 's/text-slate-500/text-soft-pistachio/g' \
    -e 's/border-slate-800/border-soft-pistachio/g' \
    -e 's/border-slate-700/border-soft-pistachio/g' \
    -e 's/bg-teal-500/bg-soft-pistachio/g' \
    -e 's/text-teal-400/text-soft-pistachio/g' \
    -e 's/text-teal-300/text-soft-pistachio/g' \
    -e 's/bg-teal-500\/10/bg-soft-pistachio\/10/g' \
    -e 's/bg-teal-500\/20/bg-soft-pistachio\/20/g' \
    -e 's/bg-teal-500\/30/bg-soft-pistachio\/30/g' \
    -e 's/bg-teal-500\/60/bg-soft-pistachio\/60/g' \
    -e 's/bg-teal-500\/80/bg-soft-pistachio\/80/g' \
    -e 's/selection:bg-teal-500/selection:bg-soft-pistachio/g' \
    -e 's/selection:text-navy-950/selection:text-deep-sage/g' \
    -e 's/bg-navy-950\/85/bg-warm-ivory\/85/g' \
    -e 's/bg-navy-950\/60/bg-warm-ivory\/60/g' \
    "$f"
done
