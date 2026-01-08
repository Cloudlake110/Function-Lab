import { FunctionDef } from './types';

// Palette
export const COLORS = {
  red: '#EF4444',     // Error/Missing/Lesion
  green: '#10B981',   // Clean/Success
  blue: '#3B82F6',    // Processing/Logic
  orange: '#F59E0B',  // Warning/Unknown
  dark: '#1F2937',
  text: '#F3F4F6'
};

export const FUNCTIONS: FunctionDef[] = [
  // --- Tier 1: Cleaning Station ---
  {
    id: 'read_csv',
    name: 'pd.read_csv',
    category: 'Cleaning',
    description: '文件图标展开成表格。',
    businessLogic: '读取原始数据文件（如 CSV）并转化为结构化的 DataFrame 表格。',
    codePrototype: "df = pd.read_csv('data.csv')"
  },
  {
    id: 'drop_duplicates',
    name: 'drop_duplicates',
    category: 'Cleaning',
    description: '重复的行发生碎裂并消失。',
    businessLogic: '移除数据中的重复记录，确保每个实体在数据集中唯一。',
    codePrototype: "df.drop_duplicates(subset=['id'], keep='first')"
  },
  {
    id: 'fillna',
    name: 'fillna',
    category: 'Cleaning',
    description: '发光的补丁飞入并填补空洞。',
    businessLogic: '使用指定的值（如 0 或平均值）填充缺失数据，保持数据完整性。',
    codePrototype: "df.fillna(value=0, inplace=True)"
  },
  {
    id: 'isnull',
    name: 'isnull',
    category: 'Cleaning',
    description: '扫描仪高亮显示空的数据洞。',
    businessLogic: '检测并标记数据中的缺失值（NaN），用于识别数据质量问题。',
    codePrototype: "df.isnull()"
  },
  {
    id: 'dropna',
    name: 'dropna',
    category: 'Cleaning',
    description: '带有空洞的行掉落出屏幕。',
    businessLogic: '直接丢弃包含缺失值的行或列，仅保留完整的数据记录。',
    codePrototype: "df.dropna(axis=0)"
  },
  {
    id: 'to_numeric',
    name: 'to_numeric',
    category: 'Cleaning',
    description: '非数字文本熔化为 NaN。',
    businessLogic: '强制将列转换为数值类型，将无法解析的错误数据（如文本）转为 NaN。',
    codePrototype: "pd.to_numeric(df['col'], errors='coerce')"
  },
  {
    id: 'astype',
    name: 'astype',
    category: 'Cleaning',
    description: '浮点数固化为整数块。',
    businessLogic: '转换 Pandas 对象的数据类型（例如将浮点数转为整数，或将字符串转为分类变量）。',
    codePrototype: "df['col'] = df['col'].astype(int)"
  },
  {
    id: 'np_array',
    name: 'np.array',
    category: 'Cleaning',
    description: '散乱的列表结晶为整齐的网格。',
    businessLogic: '将 Python 标准列表转换为高性能的 Numpy 数组，以便进行科学计算。',
    codePrototype: "arr = np.array([1, 2, 3])"
  },
  {
    id: 'columns',
    name: 'columns',
    category: 'Cleaning',
    description: '表头行发光并被提取出来。',
    businessLogic: '获取或修改 DataFrame 的列标签名称。',
    codePrototype: "cols = df.columns"
  },

  // --- Tier 2: Slicing ---
  {
    id: 'loc_iloc',
    name: 'iloc / loc',
    category: 'Slicing',
    description: '通过数字索引或标签高亮区域。',
    businessLogic: '基于位置索引 (iloc) 或标签名称 (loc) 选择并提取数据的特定子集。',
    codePrototype: "df.iloc[0:5] # vs df.loc['Alice']"
  },
  {
    id: 'query',
    name: 'query / filter',
    category: 'Slicing',
    description: '数据通过条件安检门。',
    businessLogic: '使用布尔表达式过滤数据，仅保留符合特定条件的记录。',
    codePrototype: "df.query('age > 18 & active == True')"
  },
  {
    id: 'subset',
    name: 'subset (Selection)',
    category: 'Slicing',
    description: '列与列滑动聚合。',
    businessLogic: '选择特定的列子集，聚焦于分析所需的特征，忽略无关数据。',
    codePrototype: "df[['Name', 'Age']]"
  },

  // --- Tier 3: Feature Engineering ---
  {
    id: 'label_encoder',
    name: 'LabelEncoder',
    category: 'Engineering',
    description: '文本标签被盖章变成数字。',
    businessLogic: '将分类文本数据（如“猫”、“狗”）转换为机器可读的整数编码（0, 1）。',
    codePrototype: "le.fit_transform(df['category'])"
  },
  {
    id: 'minmax_scaler',
    name: 'MinMaxScaler',
    category: 'Engineering',
    description: '柱状图缩放至 0-1 范围。',
    businessLogic: '归一化特征数据，将数值缩放到指定的范围（通常是 0 到 1），消除量纲影响。',
    codePrototype: "scaler.fit_transform(df[['values']])"
  },
  {
    id: 'fit_transform',
    name: 'fit_transform',
    category: 'Engineering',
    description: '扫描仪测量数据特征并立刻变形。',
    businessLogic: '从数据中学习参数（如均值、方差、最大最小值），并一步完成数据的转换。',
    codePrototype: "scaler.fit_transform(X_train)"
  },
  {
    id: 'fit_resample',
    name: 'fit_resample',
    category: 'Engineering',
    description: '少数类别的点进行自我克隆。',
    businessLogic: '通过过采样少数类（如 SMOTE 算法）来平衡数据集的类别分布。',
    codePrototype: "X_res, y_res = ros.fit_resample(X, y)"
  },
  {
    id: 'softmax',
    name: 'scipy.special.softmax',
    category: 'Engineering',
    description: '原始数值条转化为概率条。',
    businessLogic: '将原始输出值（Logits）转换为概率分布，所有值的和为 1。',
    codePrototype: "probs = softmax(logits)"
  },
  {
    id: 'apply',
    name: 'apply',
    category: 'Engineering',
    description: '扫描光束逐个变换数据。',
    businessLogic: '沿 DataFrame 的轴（行或列）应用自定义函数进行复杂的数据处理。',
    codePrototype: "df['col'].apply(lambda x: x * 2)"
  },

  // --- Tier 4: Logic ---
  {
    id: 'groupby',
    name: 'groupby',
    category: 'Logic',
    description: '行数据像磁铁一样按类别聚拢。',
    businessLogic: '根据一个或多个键将数据拆分为组，进行聚合计算（如求和、平均）后再合并。',
    codePrototype: "df.groupby('dept')['salary'].mean()"
  },
  {
    id: 'sort_values',
    name: 'sort_values',
    category: 'Logic',
    description: '行与行进行物理赛跑排序。',
    businessLogic: '根据某一列或多列的数值大小对数据行进行排序，以发现排名或趋势。',
    codePrototype: "df.sort_values(by='score', ascending=False)"
  },
  {
    id: 'concat',
    name: 'concat',
    category: 'Logic',
    description: '两个表格吸附并拼接在一起。',
    businessLogic: '将多个 DataFrame 沿行（纵向）或列（横向）方向进行合并。',
    codePrototype: "pd.concat([df1, df2])"
  },
  {
    id: 'argmax_argsort',
    name: 'np.argmax / np.argsort',
    category: 'Logic',
    description: '高亮峰值并对索引进行洗牌。',
    businessLogic: '返回最大值的索引 (argmax) 或返回能将数组排序的索引数组 (argsort)。',
    codePrototype: "idx = np.argmax(arr)"
  },
  {
    id: 'quantile',
    name: 'quantile',
    category: 'Logic',
    description: '激光水平线切割排序后的数据。',
    businessLogic: '计算数据的统计分位数（如 25%、50% 中位数、75%），用于了解分布情况。',
    codePrototype: "df['col'].quantile([0.25, 0.75])"
  },

  // --- Tier 5: Training ---
  {
    id: 'train_test_split',
    name: 'train_test_split',
    category: 'Training',
    description: '剪刀将数据集剪成两部分。',
    businessLogic: '将数据集随机划分为训练集和测试集，以公平地评估模型性能。',
    codePrototype: "train, test = train_test_split(df, test_size=0.2)"
  },
  {
    id: 'confusion_matrix',
    name: 'confusion_matrix',
    category: 'Training',
    description: '2x2 网格闪烁命中与失误。',
    businessLogic: '通过对比预测标签与真实标签，生成矩阵以评估分类模型的准确性（真阳、假阳等）。',
    codePrototype: "confusion_matrix(y_true, y_pred)"
  },
  {
    id: 'predict',
    name: 'predict',
    category: 'Training',
    description: '新数据进入黑盒模型。',
    businessLogic: '使用训练好的模型对未见过的（测试或新）数据生成预测结果。',
    codePrototype: "preds = model.predict(X_new)"
  }
];