
import SVGHeadquarters from '../../logic/components/SVGHeadquarters';

export default (buildingId: string): JSX.Element => {
  switch (buildingId) {
    case "HEADQUARTERS":
      return new SVGHeadquarters({}).render()
  }

  return <></>;
}