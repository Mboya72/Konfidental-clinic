<div className="absolute bottom-[12%] right-[6%] flex w-[40%] max-w-[25dvw] items-center pt-6 text-[10px] font-semibold uppercase md:text-xs">
                <div className="scroll-trigger pointer-events-auto flex flex-col items-center gap-2">
                  <a href="#explore" aria-label="Scroll to explore">
                    <div id="mouse-scroll">
                      <div className="mouse">
                        <div className="mouse-in" />
                      </div>

                      <div>
                        <span className="down-arrow-1" />
                        <span className="down-arrow-2" />
                        <span className="down-arrow-3" />
                      </div>
                    </div>
                  </a>

                  <span className="norris-text norris-dark">
                    {"Scroll down".split("").map((char, index) => (
                      <span
                        key={index}
                        className="norris-char"
                        style={{ "--char-index": index } as React.CSSProperties}
                      >
                        <span
                          className="norris-char-inner"
                          data-char={char === " " ? "\u00A0" : char}
                        >
                          {char === " " ? "\u00A0" : char}
                        </span>
                      </span>
                    ))}
                  </span>
                </div>
              </div>