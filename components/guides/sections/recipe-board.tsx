/** 文件职责：渲染 recipe-board，Runes of Aldur Remnant 配方看板（Rune / 波次 / 危险 / 奖励）。 */
import type { GuideSection } from "../../../lib/guides/schema";

type Section = Extract<GuideSection, { type: "recipe-board" }>;

export function RecipeBoard({ section }: { section: Section }) {
  return (
    <div className="guide-recipe-board">
      {section.intro ? <p className="guide-note">{section.intro}</p> : null}
      <h4 className="guide-recipe-board__subhead">可用 Rune</h4>
      <div className="guide-recipe-board__runes">
        {section.runes.map((rune) => (
          <div className="guide-recipe-board__rune" key={rune.id}>
            <h5>{rune.name}</h5>
            <p>{rune.description}</p>
            <p className="guide-recipe-board__meta">
              <span className="pill pill--red">{rune.risk}</span>
              <span className="pill pill--green">{rune.reward}</span>
            </p>
          </div>
        ))}
      </div>
      <h4 className="guide-recipe-board__subhead">配方</h4>
      <table className="guide-matrix__table">
        <thead>
          <tr>
            <th>配方</th>
            <th>Rune 数</th>
            <th>波次</th>
            <th>危险</th>
            <th>奖励</th>
            <th>适合</th>
            <th>退出条件</th>
          </tr>
        </thead>
        <tbody>
          {section.recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td>{recipe.name}</td>
              <td>{recipe.runeCount}</td>
              <td>{recipe.waves}</td>
              <td>{recipe.danger}</td>
              <td>{recipe.reward}</td>
              <td>{recipe.suitableFor}</td>
              <td>{recipe.exitCondition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
