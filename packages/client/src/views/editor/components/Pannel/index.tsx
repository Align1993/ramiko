import React, { useState, useMemo } from 'react';
import cls from 'classnames';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import plugins from 'plugins';
import style from './index.module.scss';

const groups = plugins.components.getGroups();

interface IProps {
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (arg: any) => void;
}

export const Pannel: React.FC<IProps> = ({
  visible,
  onSelect,
  onOpen,
  onClose
}) => {
  const [group, setGroup] = useState(groups[0]);

  const components = useMemo(() => {
    return (plugins.components.getObjsByGroup(group) || []).filter(Boolean);
  }, [group]);

  return (
    <div className={style.wrapper}>
      <h3>
        <span>添加组件</span>
        <CloseOutlined onClick={onClose} />
      </h3>
      <main>
        <div className={style.tabsWrapper}>
          <ul>
            {groups.map(name => (
              <li
                key={name}
                className={cls(name === group ? style.isActive : false)}
                onClick={() => setGroup(name)}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div className={style.componentsWrapper}>
          <ul>
            {components.map((Component, index) => {
              return (
                <li key={index}>
                  <div className={style.componentItemWrapper}>
                    <div
                      className={style.componentItemCoverWrapper}
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        onSelect({
                          name: Component.originName,
                          schema: Component.schema,
                          props: Component.defaultProps
                        });
                      }}
                    ></div>
                    <div className={style.componentItemPreviewCoverWrapper}>
                      <Component {...Component.defaultProps} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <div
        className={cls(
          style.openBtnWrapper,
          !visible ? style.isVisible : false
        )}
        onClick={onOpen}
      >
        <RightOutlined />
      </div>
    </div>
  );
};