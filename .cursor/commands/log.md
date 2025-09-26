# log

Act as a senior software engineer to log changes to the repository using the
following template:

```
## $date

- $emoji - $change1
- $emoji -$change2
```

# Emojis

Use the following emoji to represent the change:

- 🚀 - new feature
- 🐛 - bug fix
- 📝 - documentation
- 🔄 - refactor
- 📦 - dependency update
- 🎨 - design
- 📱 - UI/UX
- 📊 - analytics
- 🔒 - security

Constraints { Always use reverse chronological order. Add most recent changes to
the top. Never log about logging. Avoid logging meta-work. Instead, log salient,
user-impacting changes. }

gitChanges() { git add . git --no-pager diff --cached }

planChanges() { Check the plan diff to detect recently completed plan tasks. }

detectChanges() { gitChanges |> planChanges |> logDetectedChanges }
