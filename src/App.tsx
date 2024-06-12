import DataChart from "./components/DataChart";
import InputPoint from "./components/InputPoint";
import MatrixTable from "./components/MatrixTable";
import PointTable from "./components/PointTable";
import { useCMeans } from "./utils/useCmeans";



function App() {


  const {
    addCentroid, addPoint, centroids, costFunction,
    distanceMatrix, membershipMatrix,
    onIterate, onReset, points
  } = useCMeans("fuzzy");


  return (
    <main className="py-3 mx-auto max-w-5xl md:px-5 lg:px-0 lg:py-6">
      <header className="py-4 px-3 flex flex-col items-center justify-center gap-4">
        <h1 className="font-bold text-2xl md:text-3xl">C-Means Algorithm Calculator</h1>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-3">
        <InputPoint action={addPoint} title="Point" />
        <InputPoint action={addCentroid} title="Centroid" />
      </section>
      <section className="px-3 mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <PointTable data={points} title="Points" />
        <PointTable data={centroids} title="Centroids" />
      </section>
      <section className="px-3 mt-8 w-full flex justify-center">
        <DataChart points={points} centroids={centroids} />
      </section>
      <section className="px-3 mt-4 flex justify-center py-2">
        <h2 className="text-xl font-semibold">Cost Function: {costFunction.toFixed(4) ?? 0}</h2>
      </section>
      <section className="flex items-center justify-center gap-2">
        <button onClick={onReset} className='text-white text-xl bg-black px-2 py-2 rounded-md mt-2 font-semibold min-w-40' >
          Reset
        </button>
        <button onClick={onIterate} className='text-white text-xl bg-black px-2 py-2 rounded-md mt-2 font-semibold min-w-40' >
          Iterate
        </button>
      </section>
      <section className="flex flex-col items-center justify-center px-3 py-5 gap-6">
        <MatrixTable matrix={distanceMatrix} title="Distance matrix" />
        <MatrixTable matrix={membershipMatrix} title="Membership matrix" />
      </section>
    </main>
  )
}

export default App
