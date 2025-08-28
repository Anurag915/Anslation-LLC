# 🚗 Vehicle Comparator

A React-based web app that allows users to **search and compare two vehicles** by fetching real-time specs and details using the **Cars by API Ninjas** API (via RapidAPI).

## ✨ Features

* 🔍 **Autocomplete search**: Suggestions appear as you type vehicle names.
* 📊 **Vehicle comparison**: Compare 2 cars side by side with detailed specs.
* 🎨 **Modern UI**: Built with Tailwind CSS, fully responsive design.
* ⚡ **API-powered**: Uses RapidAPI to fetch car specs.

---

## 🛠️ Tech Stack

* [React.js](https://react.dev/)
* [Vite](https://vitejs.dev/) (bundler)
* [Tailwind CSS](https://tailwindcss.com/)
* [Axios](https://axios-http.com/) for API requests
* [RapidAPI - Cars by API Ninjas](https://rapidapi.com/apininjas/api/cars-by-api-ninjas/)

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/vehicle-comparator.git
cd vehicle-comparator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get your API key

* Go to [RapidAPI](https://rapidapi.com/apininjas/api/cars-by-api-ninjas/)
* Subscribe to the **Cars by API Ninjas** API
* Copy your API key

### 4. Create a `.env` file in the root folder

```env
VITE_RAPIDAPI_KEY=your_api_key_here
```

⚠️ **Do not commit your `.env` file** to GitHub.

---

## ▶️ Running the App

Start the development server:

```bash
npm run dev
```

Then open:
👉 [https://anslation-llc.vercel.app/](https://anslation-llc.vercel.app/)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── VehicleCompare.jsx   # Main comparison component
│   ├── VehicleCard.jsx      # Displays vehicle specs
│   ├── CarIcon.jsx          # Placeholder icon
├── App.jsx
├── main.jsx
```

---

## 🚀 Future Improvements

* [ ] Show **average price & mileage** (via Car Averages API)
* [ ] Add **charts** to compare MPG / horsepower visually
* [ ] Save recent comparisons

---

## 👨‍💻 Author

Developed by **\[Anurag Prajapati]A** ✨
If you like this project, feel free to ⭐ star the repo!
