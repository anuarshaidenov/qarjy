import { getTranslations } from "next-intl/server";
import React from "react";

type Props = {};

export const DashboardSection = async (props: Props) => {
  const t = await getTranslations();

  return (
    <section className="container py-32 flex flex-col gap-32">
      <h2 className="text-3xl md:text-5xl font-semibold text-center">
        {t("dashboard-section.title")} <br /> {t("dashboard-section.subtitle")}
        <span className="text-green-800">
          {t("dashboard-section.subtitle-highlight")}
        </span>
        .
      </h2>

      <div className="flex flex-col gap-8">
        <div className="mb-8 md:mb-12 flex flex-col gap-4">
          <h3 className="text-2xl md:text-3xl font-bold  ">
            {t("dashboard-section.description")}
          </h3>
          <p className="text-muted-foreground font-mono">
            {t("dashboard-section.description-2")}
          </p>
        </div>

        <DashboardBudgets />
      </div>
      <div className="flex flex-col gap-8">
        <div className="mb-8 md:mb-12 flex flex-col gap-4">
          <h3 className="text-2xl md:text-3xl font-bold  ">
            {t("dashboard-section.description-3")}
          </h3>
          <p className="text-muted-foreground font-mono">
            {t("dashboard-section.description-4")}
          </p>
        </div>

        <Charts />
      </div>
      <div className="flex flex-col gap-8">
        <div className="mb-8 md:mb-12 flex flex-col gap-4">
          <h3 className="text-2xl md:text-3xl font-bold  ">
            {t("dashboard-section.description-5")}
          </h3>
          <p className="text-muted-foreground font-mono">
            {t("dashboard-section.description-6")}
          </p>
        </div>
        <Visualizer />
      </div>
    </section>
  );
};

const DashboardBudgets = async () => {
  const t = await getTranslations();

  return (
    <div className="h-full p-3 border rounded-xl">
      <section className="py-8 px-4 container flex flex-col gap-8">
        <h1 className="text-3xl md:text-5xl font-bold">
          {t("dashboard.all-budgets.title")}
        </h1>
        <p className="text-muted-foreground font-mono">
          {t("dashboard.all-budgets.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:grid-cols-4">
          <div className="rounded-xl border bg-card text-card-foreground shadow hover:border-foreground/50 transition-colors">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight">
                october😀
              </h3>
            </div>
            <div className="p-6 pt-0 text-sm">
              <div className="space-y-1">
                <p>
                  {t("budget-card.monthly-income")}:{" "}
                  <span className="font-bold">1,000,000 ₸</span>
                </p>
              </div>
            </div>
            <div className="flex items-center p-6 pt-0"></div>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow hover:border-foreground/50 transition-colors">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight">
                september😪
              </h3>
            </div>
            <div className="p-6 pt-0 text-sm">
              <div className="space-y-1">
                <p>
                  {t("budget-card.monthly-income")}:{" "}
                  <span className="font-bold">650,000 ₸</span>
                </p>
              </div>
            </div>
            <div className="flex items-center p-6 pt-0"></div>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow hover:border-foreground/50 transition-colors">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight">
                august😪
              </h3>
            </div>
            <div className="p-6 pt-0 text-sm">
              <div className="space-y-1">
                <p>
                  {t("budget-card.monthly-income")}:{" "}
                  <span className="font-bold">300,000 ₸</span>
                </p>
              </div>
            </div>
            <div className="flex items-center p-6 pt-0"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Charts = async () => {
  const t = await getTranslations();

  return (
    <>
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight">
            {t("expenses-pie-chart.title")}
          </h3>
          <p className="text-sm text-muted-foreground font-mono">
            {t("expenses-pie-chart.subtitle")}
          </p>
        </div>
        <div className="p-6 pt-0">
          <div
            data-chart="chart-r1m"
            className="flex justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none mx-auto aspect-square h-full max-h-[300px] md:max-h-[290px]"
          >
            <div
              className="recharts-responsive-container"
              style={{ width: "100%", height: "100%", minWidth: 0 }}
            >
              <div
                className="recharts-wrapper"
                style={{
                  position: "relative",
                  cursor: "default",
                  width: "100%",
                  height: "100%",
                  maxHeight: 290,
                  maxWidth: 290,
                }}
              >
                <svg
                  cx="50%"
                  cy="50%"
                  className="recharts-surface"
                  width={290}
                  height={290}
                  viewBox="0 0 290 290"
                  style={{ width: "100%", height: "100%" }}
                >
                  <title />
                  <desc />
                  <defs>
                    <clipPath id="recharts11-clip">
                      <rect x={5} y={5} height={280} width={280} />
                    </clipPath>
                  </defs>
                  <g className="recharts-layer recharts-pie" tabIndex={0}>
                    <g className="recharts-layer">
                      <g
                        className="recharts-layer recharts-pie-sector"
                        tabIndex={-1}
                      >
                        <path
                          cx={145}
                          cy={145}
                          name="rent and utils"
                          strokeWidth={5}
                          stroke="#fff"
                          fill="hsl(var(--chart-1))"
                          id="6f18aae7-0cc3-429f-8bb1-4e5a48e1c930"
                          tabIndex={-1}
                          className="recharts-sector"
                          d="M 257,145
          A 112,112,0,
          1,0,
          33.207843975587565,151.820106407779
        L 65.14845998256254,149.871504576985
            A 80,80,0,
            1,1,
            225,145 Z"
                          role="img"
                        />
                      </g>
                      <g
                        className="recharts-layer recharts-pie-sector"
                        tabIndex={-1}
                      >
                        <path
                          cx={145}
                          cy={145}
                          name="groceries"
                          strokeWidth={5}
                          stroke="#fff"
                          fill="hsl(var(--chart-3))"
                          id="f7ba3a9c-1ab1-48d0-8092-42694fefc587"
                          tabIndex={-1}
                          className="recharts-sector"
                          d="M 33.207843975587565,151.820106407779
          A 112,112,0,
          0,0,
          116.56396570238172,253.330014093162
        L 124.68854693027265,222.37858149511572
            A 80,80,0,
            0,1,
            65.14845998256254,149.871504576985 Z"
                          role="img"
                        />
                      </g>
                      <g
                        className="recharts-layer recharts-pie-sector"
                        tabIndex={-1}
                      >
                        <path
                          cx={145}
                          cy={145}
                          name="gift"
                          strokeWidth={5}
                          stroke="#fff"
                          fill="hsl(var(--chart-1))"
                          id="3791919c-b60d-4bc9-a456-0b503383b20e"
                          tabIndex={-1}
                          className="recharts-sector"
                          d="M 116.56396570238172,253.330014093162
          A 112,112,0,
          0,0,
          171.3614616093743,253.85344892017656
        L 163.82961543526736,222.75246351441183
            A 80,80,0,
            0,1,
            124.68854693027265,222.37858149511572 Z"
                          role="img"
                        />
                      </g>
                      <g
                        className="recharts-layer recharts-pie-sector"
                        tabIndex={-1}
                      >
                        <path
                          cx={145}
                          cy={145}
                          name="installments"
                          strokeWidth={5}
                          stroke="#fff"
                          fill="hsl(var(--chart-2))"
                          id="7ff502b1-8a99-4243-a870-6a402a2c577d"
                          tabIndex={-1}
                          className="recharts-sector"
                          d="M 171.3614616093743,253.85344892017656
          A 112,112,0,
          0,0,
          213.5728154395347,233.55376323282658
        L 193.9805824568105,208.25268802344755
            A 80,80,0,
            0,1,
            163.82961543526736,222.75246351441183 Z"
                          role="img"
                        />
                      </g>
                      <g
                        className="recharts-layer recharts-pie-sector"
                        tabIndex={-1}
                      >
                        <path
                          cx={145}
                          cy={145}
                          name="sauna"
                          strokeWidth={5}
                          stroke="#fff"
                          fill="hsl(var(--chart-2))"
                          id="606c0cc3-0b59-4548-9451-bfdc7341d304"
                          tabIndex={-1}
                          className="recharts-sector"
                          d="M 213.5728154395347,233.55376323282658
          A 112,112,0,
          0,0,
          235.2739744905366,211.29185115594484
        L 209.4814103503833,192.35132225424633
            A 80,80,0,
            0,1,
            193.9805824568105,208.25268802344755 Z"
                          role="img"
                        />
                      </g>
                      <g
                        className="recharts-layer recharts-pie-sector"
                        tabIndex={-1}
                      >
                        <path
                          cx={145}
                          cy={145}
                          strokeWidth={5}
                          stroke="#fff"
                          fill="hsl(var(--chart-3))"
                          id="f361b693-34cf-46ed-8d2e-853503228b9f"
                          tabIndex={-1}
                          className="recharts-sector"
                          d="M 235.2739744905366,211.29185115594484
          A 112,112,0,
          0,0,
          246.0716862653985,193.2546809695065
        L 217.1940616181418,179.4676292639332
            A 80,80,0,
            0,1,
            209.4814103503833,192.35132225424633 Z"
                          role="img"
                        />
                      </g>
                      <g
                        className="recharts-layer recharts-pie-sector"
                        tabIndex={-1}
                      >
                        <path
                          cx={145}
                          cy={145}
                          name="outing w friends"
                          strokeWidth={5}
                          stroke="#fff"
                          fill="hsl(var(--chart-4))"
                          id="b8ac84dc-ed46-4d06-af4f-7d3b8206cc88"
                          tabIndex={-1}
                          className="recharts-sector"
                          d="M 246.0716862653985,193.2546809695065
          A 112,112,0,
          0,0,
          251.79078842666496,178.75985052116317
        L 221.27913459047497,169.114178943688
            A 80,80,0,
            0,1,
            217.1940616181418,179.4676292639332 Z"
                          role="img"
                        />
                      </g>
                      <g
                        className="recharts-layer recharts-pie-sector"
                        tabIndex={-1}
                      >
                        <path
                          cx={145}
                          cy={145}
                          name="bdays"
                          strokeWidth={5}
                          stroke="#fff"
                          fill="hsl(var(--chart-5))"
                          id="7d53f915-a092-4dea-9a7f-f76d532e8555"
                          tabIndex={-1}
                          className="recharts-sector"
                          d="M 251.79078842666496,178.75985052116317
          A 112,112,0,
          0,0,
          255.44279211003206,163.6115467100465
        L 223.8877086500229,158.2939619357475
            A 80,80,0,
            0,1,
            221.27913459047497,169.114178943688 Z"
                          role="img"
                        />
                      </g>
                      <g
                        className="recharts-layer recharts-pie-sector"
                        tabIndex={-1}
                      >
                        <path
                          cx={145}
                          cy={145}
                          name="phone"
                          strokeWidth={5}
                          stroke="#fff"
                          fill="hsl(var(--chart-5))"
                          id="d0b84c3f-b666-4906-8436-9e870721e058"
                          tabIndex={-1}
                          className="recharts-sector"
                          d="M 255.44279211003206,163.6115467100465
          A 112,112,0,
          0,0,
          256.61066893811534,154.33051869868012
        L 224.72190638436808,151.66465621334294
            A 80,80,0,
            0,1,
            223.8877086500229,158.2939619357475 Z"
                          role="img"
                        />
                      </g>
                      <g
                        className="recharts-layer recharts-pie-sector"
                        tabIndex={-1}
                      >
                        <path
                          cx={145}
                          cy={145}
                          name="subscriptions"
                          strokeWidth={5}
                          stroke="#fff"
                          fill="hsl(var(--chart-4))"
                          id="a7be5210-c329-41b3-ba05-67893724bc90"
                          tabIndex={-1}
                          className="recharts-sector"
                          d="M 256.61066893811534,154.33051869868012
          A 112,112,0,
          0,0,
          257,145.00000000000003
        L 225,145.00000000000003
            A 80,80,0,
            0,1,
            224.72190638436808,151.66465621334294 Z"
                          role="img"
                        />
                      </g>
                    </g>
                    <text
                      x={145}
                      y={145}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={145}
                        y={145}
                        className="fill-foreground text-3xl font-bold"
                      >
                        1,342,248
                      </tspan>
                      <tspan x={145} y={169} className="fill-muted-foreground">
                        {t("expenses-pie-chart.total")}
                      </tspan>
                    </text>
                  </g>
                </svg>
                <div
                  tabIndex={-1}
                  className="recharts-tooltip-wrapper recharts-tooltip-wrapper-right recharts-tooltip-wrapper-bottom"
                  style={{
                    visibility: "hidden",
                    pointerEvents: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transform: "translate(80.8086px, 215.923px)",
                  }}
                />
              </div>
            </div>
          </div>
          <ul className="flex items-center gap-4 flex-wrap">
            <li className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "hsl(var(--chart-1))" }}
              />
              <span>rent and utils</span>
            </li>
            <li className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "hsl(var(--chart-3))" }}
              />
              <span>groceries</span>
            </li>
            <li className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "hsl(var(--chart-1))" }}
              />
              <span>gift</span>
            </li>
            <li className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "hsl(var(--chart-2))" }}
              />
              <span>installments</span>
            </li>
            <li className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "hsl(var(--chart-2))" }}
              />
              <span>sauna</span>
            </li>
            <li className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "hsl(var(--chart-4))" }}
              />
              <span>outing w friends</span>
            </li>
            <li className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "hsl(var(--chart-5))" }}
              />
              <span>bdays</span>
            </li>
            <li className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "hsl(var(--chart-5))" }}
              />
              <span>phone</span>
            </li>
            <li className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "hsl(var(--chart-4))" }}
              />
              <span>subscriptions</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

const Visualizer = async () => {
  const t = await getTranslations();

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow  w-full">
      <div className="p-6 h-52 pt-10 flex flex-col gap-8 items-center justify-center">
        <h2 className="font-bold text-green-700 text-3xl sm:text-5xl">
          2,585,000 ₸
        </h2>
        <div className="flex flex-wrap gap-4 text-sm items-center">
          <p className="shrink-0">✨{t("dashboard.savings-estimate-left")}</p>
          <input
            className="rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-8 h-8 block p-0 pl-2"
            type="text"
            defaultValue={6}
            inputMode="numeric"
          />
          <p>{t("dashboard.savings-estimate-right")} ✨</p>
        </div>
      </div>
    </div>
  );
};
