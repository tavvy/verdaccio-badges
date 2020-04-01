import { BadgeFactory } from 'gh-badges';

const bf = new BadgeFactory();

const generateBadge = ({ version, label = 'npm', color = 'blue', template = 'flat', labelColor }) =>
  bf.create({
    text: [label, version],
    color,
    labelColor,
    template,
  });

export { generateBadge };
