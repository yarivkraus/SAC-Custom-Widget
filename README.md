# SAC Custom Widget - Table with Input Fields

## 🚨 Important: Understanding the Error

You saw this error:
```
The system couldn't load the custom widget com.sap.sample.tablewidget_1.x (kind: main)
```

### Why This Happens

The widget is configured to load from `https://localhost:8080/main.js`, but **SAC Cloud cannot access localhost** on your computer. You need to:

1. **Test locally first** (using `demo.html`)
2. **Deploy to a public URL** (like GitHub Pages)
3. **Update the URLs** in `main.json`
4. **Then import to SAC**

## 📖 Quick Links

- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** ← **START HERE** for fixing the error
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Detailed deployment guide
- **[QUICKSTART.md](QUICKSTART.md)** - Quick start guide
- **[README.md](README.md)** - Full documentation

## 🎯 Quick Actions

### Test Locally (Right Now!)

**Option 1: Double-click**
```
Double-click: test-widget.bat
```

**Option 2: Open directly**
```
Double-click: demo.html
```

✅ This lets you test the widget works before deploying to SAC

### Deploy to SAC (3 Steps)

1. **Host on GitHub Pages** (see TROUBLESHOOTING.md)
2. **Update URLs in main.json** to your GitHub Pages URL
3. **Import to SAC** using your public URL

## 📁 Files

| File | Purpose |
|------|---------|
| `main.json` | Widget manifest (update URLs here!) |
| `main.js` | Widget code |
| `styling.js` | Styling panel |
| `demo.html` | Local testing page |
| `test-widget.bat` | Quick test script |
| `server.js` | Development server (with CORS) |
| `TROUBLESHOOTING.md` | **Fix the loading error** |
| `DEPLOYMENT.md` | Deployment instructions |

## ✅ Next Steps

1. ✅ **Test locally** - Run `test-widget.bat` or open `demo.html`
2. 📖 **Read TROUBLESHOOTING.md** - Understand the localhost issue
3. 🚀 **Deploy to GitHub Pages** - Follow the guide
4. 🔄 **Update main.json** - Change localhost URLs to GitHub Pages URLs
5. 📥 **Import to SAC** - Use your public URL

## 🆘 Need Help?

See **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** for:
- Why localhost doesn't work with SAC
- How to deploy to GitHub Pages
- Step-by-step import instructions
- Common error solutions

## 📊 Widget Features

- Interactive table with CRUD operations
- Input fields (text, number, dropdown, date)
- Row selection and events
- Data export (JSON)
- SAP Fiori styling
- Fully responsive

### 🔗 Data Source Connection

You can now bind your SAC data models to this widget:

1.  In SAC, select the widget and open the **Builder** panel.
2.  Go to the **Data Binding** section and add a data source.
3.  Map your dimensions and measures:
    *   **Dimensions**: The first dimension maps to the **Name** column, the second to **Category**.
    *   **Measures**: The first measure maps to the **Value** column.
4.  Data from your data source is visually indicated with a blue left border.

---

**Remember:** Test locally first, then deploy to a public URL for SAC!
