import{useState} from "react";
function Search({results, setResults}) {
    const[filterType, setFilterType] = useState("model");
    const[keyword, setKeyword] = useState("");
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState("");
    async function handleSearch() {
        setLoading(true);
        setError("");
        try{
        const response = await fetch(
            `/api/data/search?filterType=${filterType}&keyword=${keyword}`)
        
            const data = await response.json();
        setResults(data);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

function getAverage(data, property) {
  if (data.length === 0) {
    return 0;
  }

  let total = 0;

  for (let i = 0; i < data.length; i++) {
    total = total + Number(data[i][property]);
  }

  return Math.round(total / data.length);
}

function getMedian(data, property) {
  if (data.length === 0) {
    return 0;
  }

  const numbers = data.map((record) => Number(record[property]));

  numbers.sort((a, b) => a - b);

  const middle = Math.floor(numbers.length / 2);

  if (numbers.length % 2 === 0) {
    return (numbers[middle - 1] + numbers[middle]) / 2;
  }

  return numbers[middle];
}

function formatNumber(value) {
  return Number(value.toFixed(2)).toLocaleString("en-US");
}
  

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-4">
                    <label className="form-label">
                        Select data point to filter search by
                    </label>

                    <select 
                        className="form-select mb-3"
                        value={filterType}
                        onChange={(event) => setFilterType(event.target.value)}
                    >
                            <option value="model">model</option>
                            <option value="gender"> gender</option>
                            <option value="operatingSystem">operatingSystem</option>
                            <option value="behaviorclass">behaviorClass</option>
                    </select>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Search by Keyword"
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                    />
                    <button className="btn btn-outline-dark w-100"
                            onClick={handleSearch}
                    >
                        Search
                    </button>
                    <p className="mt-3">
                        {loading
                            ? "Loading..."
                            : results.length > 0
                            ? `Displaying ${results.length} Records`
                            : "No Records To Display"}
                    </p>
                </div>
            </div>
            <div className="row mt-4 mb-4">
  <div className="col-3">
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">App Usage Time (min/day)</h5>

        <p>
          Average -{" "}
          {formatNumber(
            getAverage(results, "App Usage Time (min/day)")
          )}{" "}
          Minutes
        </p>

        <p>
          Median -{" "}
          {formatNumber(
            getMedian(results, "App Usage Time (min/day)")
          )}{" "}
          Minutes
        </p>
      </div>
    </div>
  </div>

  <div className="col-3">
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">Screen On Time (hours/day)</h5>

        <p>
          Average -{" "}
          {formatNumber(
            getAverage(results, "Screen On Time (hours/day)")
          )}{" "}
          Hours
        </p>

        <p>
          Median -{" "}
          {formatNumber(
            getMedian(results, "Screen On Time (hours/day)")
          )}{" "}
          Hours
        </p>
      </div>
    </div>
  </div>

  <div className="col-3">
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">Number of Apps Installed</h5>

        <p>
          Average -{" "}
          {formatNumber(
            getAverage(results, "Number of Apps Installed")
          )}{" "}
          Apps
        </p>

        <p>
          Median -{" "}
          {formatNumber(
            getMedian(results, "Number of Apps Installed")
          )}{" "}
          Apps
        </p>
      </div>
    </div>
  </div>

  <div className="col-3">
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">Age</h5>

        <p>
          Average - {formatNumber(getAverage(results, "Age"))} Years Old
        </p>

        <p>
          Median - {formatNumber(getMedian(results, "Age"))} Years Old
        </p>
      </div>
    </div>
  </div>
</div>
            {error && <p className="text-danger">{error}</p>}
            {loading ? (
            <p>Loading Records...</p>
        ) : results.length > 0 ? (
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        {Object.keys(results[0]).map((key) => (
                            <th key={key} className="text-start">
                                {key}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {results.map((record, index) => (
                        <tr key={index}>
                            {Object.values(record).map((value, index) => (
                                <td key={index} className="text-start">
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : null}
        </div>
    );
}

export default Search;