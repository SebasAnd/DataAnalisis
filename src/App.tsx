import { useState } from "react";
import "./App.css";
import { useFilePicker } from "use-file-picker";
import { read } from "xlsx";
type RowFormat = {
  RPMMenor: string;
  Elevation: string;
  ActivityTime: string;
  Distance: string;
};
type Runner = {
  Id: string;
  UserId: string;
  StartTimeInSeconds: string;
  DurationInSeconds: string;
  DistanceInMeters: string;
  Steps: string;
  AverageSpeedInMetersPerSecond: string;
  AveragePaceInMinutesPerKilometer: string;
  TotalElevationGainInMeters: string;
  AverageHeartRateInBeatsPerMinute: string;
  Reason: string;
};

function App() {
  const { loading } = useFilePicker({
    accept: ".xlsx",
  });
  const [fileContentTable, setContentTable] = useState(<>Select a File</>);

  let averageData: RowFormat;

  let runnersCheaters: Runner[] = [];

  let TotalRCheaters = 0;

  let CheraterUserIds: string[] = [];

  async function changeInput(input: any) {
    setContentTable(<div>Loading...</div>);
    const file = input.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = read(data);
    console.log(
      "clicked",
      workbook,
      Object.keys(workbook.Sheets[workbook.SheetNames[0]]).length,
      workbook.Sheets[workbook.SheetNames[0]]["I3"]["v"]
    ); //["Random activities"]["A3"]);

    FillTheTable(
      workbook.Sheets[workbook.SheetNames[0]],
      Object.keys(workbook.Sheets[workbook.SheetNames[0]]).length
    );
    setContentTable(
      <>
        <div>
          <table>
            <thead>
              <tr>
                <td>Average RPM</td>
                <td>Average Elevation/Time</td>
                <td>Average Activity Time</td>
                <td>Average Distance</td>
                <td>TOTAL CHEATERS RECORDS</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{averageData.RPMMenor}</td>
                <td>{averageData.Elevation}</td>
                <td>{averageData.ActivityTime}</td>
                <td>{averageData.Distance}</td>
                <td>{TotalRCheaters}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          The cheaters records were calculated based in the average of all the
          registers, those were selected because their registers were more than
          the double of the average values.
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <td key={"Count"}>Count</td>
                <td key={workbook.Sheets[workbook.SheetNames[0]]["A1"]["v"]}>
                  {workbook.Sheets[workbook.SheetNames[0]]["A1"]["v"]}
                </td>
                <td key={workbook.Sheets[workbook.SheetNames[0]]["B1"]["v"]}>
                  {workbook.Sheets[workbook.SheetNames[0]]["B1"]["v"]}
                </td>
                <td key={workbook.Sheets[workbook.SheetNames[0]]["C1"]["v"]}>
                  {workbook.Sheets[workbook.SheetNames[0]]["C1"]["v"]}
                </td>
                <td key={workbook.Sheets[workbook.SheetNames[0]]["D1"]["v"]}>
                  {workbook.Sheets[workbook.SheetNames[0]]["D1"]["v"]}
                </td>
                <td key={workbook.Sheets[workbook.SheetNames[0]]["E1"]["v"]}>
                  {workbook.Sheets[workbook.SheetNames[0]]["E1"]["v"]}
                </td>
                <td key={workbook.Sheets[workbook.SheetNames[0]]["F1"]["v"]}>
                  {workbook.Sheets[workbook.SheetNames[0]]["F1"]["v"]}
                </td>
                <td key={workbook.Sheets[workbook.SheetNames[0]]["G1"]["v"]}>
                  {workbook.Sheets[workbook.SheetNames[0]]["G1"]["v"]}
                </td>
                <td key={workbook.Sheets[workbook.SheetNames[0]]["H1"]["v"]}>
                  {workbook.Sheets[workbook.SheetNames[0]]["H1"]["v"]}
                </td>
                <td key={workbook.Sheets[workbook.SheetNames[0]]["I1"]["v"]}>
                  {workbook.Sheets[workbook.SheetNames[0]]["I1"]["v"]}
                </td>
                <td key={workbook.Sheets[workbook.SheetNames[0]]["J1"]["v"]}>
                  {workbook.Sheets[workbook.SheetNames[0]]["J1"]["v"]}
                </td>
                <td key={"Reason"}>Reason</td>
              </tr>
            </thead>
            <tbody>
              {runnersCheaters.map((element, index) => (
                <tr key={element.Id + "k" + index}>
                  <td key={"count" + index}>{index + 1}</td>
                  <td key={element.Id + index + "A"}>{element.Id}</td>
                  <td key={element.UserId + element.Id + index + "B"}>
                    {element.UserId}
                  </td>
                  <td
                    key={element.StartTimeInSeconds + element.Id + index + "C"}
                  >
                    {element.StartTimeInSeconds}
                  </td>
                  <td
                    key={element.DurationInSeconds + element.Id + index + "D"}
                  >
                    {element.DurationInSeconds}
                  </td>
                  <td key={element.DistanceInMeters + element.Id + index + "E"}>
                    {element.DistanceInMeters}
                  </td>
                  <td key={element + element.Id + index + "F"}>
                    {element.Steps}
                  </td>
                  <td key={element.AverageSpeedInMetersPerSecond + index + "G"}>
                    {element.AverageSpeedInMetersPerSecond}
                  </td>
                  <td
                    key={
                      element.AveragePaceInMinutesPerKilometer +
                      element.Id +
                      index +
                      "H"
                    }
                  >
                    {element.AveragePaceInMinutesPerKilometer}
                  </td>
                  <td
                    key={
                      element.TotalElevationGainInMeters +
                      element.Id +
                      index +
                      "I"
                    }
                  >
                    {element.TotalElevationGainInMeters}
                  </td>
                  <td
                    key={
                      element.AverageHeartRateInBeatsPerMinute +
                      element.Id +
                      index +
                      "J"
                    }
                  >
                    {element.AverageHeartRateInBeatsPerMinute}
                  </td>
                  <td key={element.Reason + element.Id + index + "K"}>
                    {element.Reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function FillTheTable(obj: any, group: any) {
    let averageSpeedSum = 0;
    let averageElevationSum = 0;
    let averageActivity = 0;
    let averageDistance = 0;

    let totalCount = 0;
    let totalCheaters = 0;

    //console.log("clicked", obj["A" + 1], Object.keys(obj).length);
    for (let i = 2; i <= group; i++) {
      if (obj["G" + i] != undefined) {
        averageSpeedSum += obj["G" + i]["v"];
        totalCount++;
      }
      if (obj["I" + i] != undefined) {
        averageElevationSum += obj["I" + i]["v"] / obj["D" + i]["v"];
      }
      if (obj["D" + i] != undefined) {
        averageActivity += obj["D" + i]["v"];
      }
      if (obj["E" + i] != undefined) {
        averageDistance += obj["E" + i]["v"];
      }
    }
    console.log("clicked", totalCount);
    let averageObj = {
      RPMMenor: "" + averageSpeedSum / totalCount,
      Elevation: "" + averageElevationSum / totalCount,
      ActivityTime: "" + averageActivity / totalCount,
      Distance: "" + averageDistance / totalCount,
    };
    averageData = averageObj;

    for (let i = 2; i <= group; i++) {
      if (
        obj["A" + i] != undefined &&
        obj["B" + i] != undefined &&
        obj["C" + i] != undefined &&
        obj["D" + i] != undefined &&
        obj["E" + i] != undefined &&
        obj["F" + i] != undefined &&
        obj["H" + i] != undefined &&
        obj["I" + i] != undefined &&
        obj["J" + i] != undefined
      ) {
        let evaluation = {
          Id: obj["A" + i]["v"],
          UserId: obj["B" + i]["v"],
          StartTimeInSeconds: obj["C" + i]["v"],
          DurationInSeconds: obj["D" + i]["v"],
          DistanceInMeters: obj["E" + i]["v"],
          Steps: obj["F" + i]["v"],
          AverageSpeedInMetersPerSecond: obj["G" + i]["v"],
          AveragePaceInMinutesPerKilometer: obj["H" + i]["v"],
          TotalElevationGainInMeters: obj["I" + i]["v"],
          AverageHeartRateInBeatsPerMinute: obj["J" + i]["v"],
          Reason: "",
        };

        if (obj["G" + i]["v"] < averageSpeedSum / totalCount / 2) {
          evaluation.Reason = "Average Speed Too low";
          runnersCheaters.push(evaluation);
          totalCheaters++;
          if (!CheraterUserIds.includes(evaluation.UserId)) {
            CheraterUserIds.push(evaluation.UserId);
          }
          continue;
        }
        if (
          obj["I" + i]["v"] / obj["D" + i]["v"] >
          2 * (averageElevationSum / totalCount)
        ) {
          evaluation.Reason = "The Elevation Gained Is Too High";
          runnersCheaters.push(evaluation);
          totalCheaters++;
          if (!CheraterUserIds.includes(evaluation.UserId)) {
            CheraterUserIds.push(evaluation.UserId);
          }
          continue;
        }
        if (obj["D" + i]["v"] > (averageActivity / totalCount) * 2) {
          evaluation.Reason = "Activity Length Too High";
          runnersCheaters.push(evaluation);
          totalCheaters++;
          if (!CheraterUserIds.includes(evaluation.UserId)) {
            CheraterUserIds.push(evaluation.UserId);
          }
          continue;
        }
        if (obj["E" + i]["v"] > (averageDistance / totalCount) * 2) {
          evaluation.Reason = "Distance Superior To Average";
          runnersCheaters.push(evaluation);
          totalCheaters++;
          if (!CheraterUserIds.includes(evaluation.UserId)) {
            CheraterUserIds.push(evaluation.UserId);
          }
          continue;
        }
      }
    }
    TotalRCheaters = totalCheaters;
    console.log("clicked", runnersCheaters);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          changeInput(e);
        }}
      />

      <div>{fileContentTable}</div>
    </div>
  );
}

export default App;
