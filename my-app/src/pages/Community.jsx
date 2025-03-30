import React from "react";
import "../css/Community.css";

export default function Community() {
  return (
    <div className="community-page">
      <section className="trip-banner">
        <img src="/images/plantriptop.jpg" alt="Hunting Trip" />
      </section>

      <section className="community-hub">
        <div className="community-column">
          <div className="image-stack">
            <img src="/images/guidedhuntpic5.jpg" alt="Hunting Experience" />
            <img src="/images/guidedhuntpic6.jpg" alt="Hunting Experience" />
          </div>
          <div className="text-content">
            <h2>Experiences</h2>
            <p>
              Every hunt tells a story, and our community members have shared some of the most thrilling moments in the wild. 
              From the adrenaline rush of stalking an elk through dense woodlands at dawn to the patience required for a perfect long-range shot on an open prairie, 
              every adventure is unique. Many hunters recall their first encounters with a massive whitetail buck, the struggle of tracking blood trails through tough terrain, 
              and the lessons learned from hunts that didn’t go as planned. Whether it’s a group camping out in the deep backcountry or a solo hunter 
              waiting in a tree stand as the morning fog rolls in, these moments define the hunting lifestyle. Join our community to read and share stories of determination, skill, 
              and unforgettable triumphs in the great outdoors.
            </p>
          </div>
        </div>

        <div className="community-column">
          <div className="image-stack">
            <img src="/images/guidedhuntpic1.jpg" alt="Previous Hunts" />
            <img src="/images/guidedhuntpic2.jpg" alt="Previous Hunts" />
          </div>
          <div className="text-content">
            <h2>Previous Hunts</h2>
            <p>
              Looking back at our past hunts, we’ve explored some of the most challenging and rewarding terrains. 
              Hunters have braved icy mountain slopes in search of bighorn sheep, battled through thick swamps tracking wild boar, 
              and sat motionless for hours waiting for that perfect moment to take a shot at a trophy buck. 
              One of our most legendary hunts saw a group of hunters in the Midwest take down a massive 12-point buck 
              after a three-day chase, while another team in the Southwest tracked a desert mule deer through rocky canyons. 
              From the excitement of calling in a turkey at sunrise to the thrill of taking down a giant black bear in the Pacific Northwest, 
              these hunts remind us why we love the challenge, strategy, and reward of the sport.
            </p>
          </div>
        </div>

        <div className="community-column">
          <div className="image-stack">
            <img src="/images/guidedhuntpic3.jpg" alt="Hunting Records" />
            <img src="/images/guidedhuntpic4.jpg" alt="Hunting Records" />
          </div>
          <div className="text-content">
            <h2>Records</h2>
            <p>
              Our community has seen some incredible record-breaking hunts over the years. 
              One hunter took down a 14-foot alligator in Louisiana, setting a new community best for the biggest catch of the season. 
              Another hunter in Canada bagged a 900-pound moose after tracking it for over 15 miles through deep snow. 
              We’ve also had young hunters set impressive records, such as an 18-year-old bagging a 180-inch Boone and Crockett buck in Texas. 
              The challenge of breaking a record keeps hunters pushing their limits, and whether it’s for the heaviest bear, the longest bow shot, 
              or the most challenging elk stalk, every record represents the dedication and skill of our hunting community. 
              Think you have what it takes to beat one? Share your best hunt and see how it stacks up against the rest!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
