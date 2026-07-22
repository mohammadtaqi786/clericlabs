import React from "react";
import "../styles/components/HeroSocialProof.css";

export default function HeroSocialProof() {
    const stats = [
        { num: "1M", plus: "+", label: "Views Generated" },
        { num: "$150k", plus: "+", label: "Saved Through Automation" },
        { num: "50", plus: "+", label: "Founder Brands Supported" },
    ];

    return (
        <div className="hero-proof">
            {stats.map((s, i) => (
                <React.Fragment key={`proof-${i}`}>
                    <div className="proof-item">
                        <div className="proof-num">
                            {s.num}
                            <span className="proof-plus">{s.plus}</span>
                        </div>
                        <div className="proof-label">{s.label}</div>
                    </div>
                    {i < stats.length - 1 && (
                        <div className="proof-divider"></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}